import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Modal from '@material-ui/core/Modal';
import NavigateNext from '@material-ui/icons/NavigateNext';
import Close from '@material-ui/icons/Close';

import StickersImages from '../../constants/stickers';
import * as ModalActions from '../../redux/actions/modal';
import * as PackActions from '../../redux/actions/packs';
import API from '../../api';

const style = {
	header: 'bg-gray-800 text-white shadow-md rounded-lg shadow-lg flex items-center p-4',
	textContainer: '',
	textLarge: 'text-center text-lg pb-2',
	textSmall: 'text-center text-sm relative',

	root: 'w-full h-full flex flex-col justify-between items-center px-4 py-6 fixed top-0 left-0',
	scene: 'w-full h-full flex flex-col justify-center items-center',
	card:
		'flex outline-none w-full h-full user-select-none absolute justify-center items-center transition cursor-pointer',
	image: 'w-full h-full object-contain',
	nextButton: 'bg-white p-2 rounded-full shadow-xl',
};

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

class Vector {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	static from(...args) {
		if (args.length === 0) {
			return new Vector();
		} else if (args[0] instanceof Array) {
			return new Vector(args[0][0], args[0][1]);
		} else if (typeof args[0] === 'number' && typeof args[1] === 'number') {
			return new Vector(args[0], args[1]);
		} else if (args[0] instanceof Vector) {
			return args[0].copy();
		}
	}

	duplicate() {
		return new Vector(this.x, this.y);
	}

	set(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}

	get magnitude() {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}

	get sqrMagnitude() {
		return this.x ** 2 + this.y ** 2;
	}

	get normal() {
		return this.duplicate().normalize();
	}

	normalize() {
		const mag = this.magnitude;
		this.x /= mag;
		this.y /= mag;
		return this;
	}

	add(vec) {
		return new Vector(this.x + vec.x, this.y + vec.y);
	}

	subtract(vec) {
		return new Vector(this.x - vec.x, this.y - vec.y);
	}

	scale(amount) {
		return new Vector(this.x * amount, this.y * amount);
	}

	get mutate() {
		return {
			add: vec => {
				this.x += vec.x;
				this.y += vec.y;
				return this;
			},

			subtract: vec => {
				this.x -= vec.x;
				this.y -= vec.y;
				return this;
			},

			scale: amount => {
				this.x *= amount;
				this.y *= amount;
				return this;
			},

			transpose: () => {
				const buffer = this.x;
				this.x = this.y;
				this.y = buffer;
			},
		};
	}
}

const Content = React.forwardRef(({ onOpen = () => {}, onFailure = () => {} }, ref) => {
	const cardRef = React.useRef();
	const backImageRef = React.useRef();
	const frontImageRef = React.useRef();
	const dispatch = useDispatch();

	const env = React.useRef({
		velocity: new Vector(0, 0),
		angle: new Vector(0, 0),
		currentBright: 0,
		targetBright: 0,
		isOpeningPack: false,
		currentFace: 'back',
		isFlippingPack: false,
		isMounted: false,
	});

	// Function 'exports'
	React.useImperativeHandle(ref, () => ({
		reset: flipPack,
	}));

	// Initialization
	React.useEffect(() => {
		env.current.isMounted = true;
		document.addEventListener('mousedown', mouseDown);
		window.requestAnimationFrame(frame);
		return () => {
			document.removeEventListener('mousedown', mouseDown);
			env.current.isMounted = false;
		};
	}, []);

	async function openPackAnimation() {
		if (env.current.isOpeningPack) return;
		env.current.isOpeningPack = true;
		env.current.targetBright = 3000;
		frontImageRef.current.style.backgroundColor = 'white';
		backImageRef.current.style.transition = 'filter 5000ms, background-color 1000ms';
		frontImageRef.current.style.transition = 'filter 5000ms, background-color 1000ms';
		await sleep(0);
		if (!env.current.isMounted) return;
		frontImageRef.current.style.filter = 'blur(10px) grayscale(100%) brightness(10)';
		backImageRef.current.style.filter = 'blur(10px) grayscale(100%) brightness(10)';
		backImageRef.current.style.backgroundColor = 'white';
		let stickerId;
		try {
			const { data } = await API.openPack();
			stickerId = data.stickerId;
			dispatch(PackActions.openPack(stickerId));
		} catch (e) {
			console.error(e);
			onFailure();
			return;
		}
		await sleep(1000);
		if (!env.current.isMounted) return;
		env.current.currentFace = 'front';
		frontImageRef.current.style.backgroundImage = `url(${StickersImages.stickers[stickerId]})`;
		backImageRef.current.style.backgroundColor = 'transparent';
		backImageRef.current.style.opacity = '0';
		frontImageRef.current.style.filter = 'blur(0px) grayscale(0%) brightness(1)';
		await sleep(1500);
		if (!env.current.isMounted) return;
		onOpen();
	}

	async function flipPack() {
		env.current.isFlippingPack = true;
		cardRef.current.style.transition = '1000ms';
		backImageRef.current.style.transition = '0ms';
		await sleep(0);
		if (!env.current.isMounted) return;
		backImageRef.current.style.filter = 'blur(0px) grayscale(0%) brightness(1)';
		backImageRef.current.style.backgroundColor = 'transparent';
		backImageRef.current.style.opacity = '0';
		cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
		await sleep(250);
		backImageRef.current.style.opacity = '1';
		frontImageRef.current.style.backgroundImage = '';
		frontImageRef.current.style.backgroundColor = 'transparent';
		await sleep(750);
		if (!env.current.isMounted) return;
		env.current = {
			velocity: new Vector(0, 0),
			angle: new Vector(0, 0),
			currentBright: 0,
			targetBright: 0,
			isOpeningPack: false,
			currentFace: 'back',
			isFlippingPack: true,
			isMounted: true,
		};
		cardRef.current.style.transition = '0ms';
		await sleep(0);
		if (!env.current.isMounted) return;
		cardRef.current.style.transform = 'rotateX(0) rotateY(0deg)';
		env.current.isFlippingPack = false;
	}

	function frameVelocity() {
		const { angle, velocity, currentFace } = env.current;
		angle.mutate.add(velocity);
		velocity.mutate.subtract(angle.scale(0.03));
		velocity.mutate.scale(0.95);
		let { x, y } = angle;
		if (currentFace === 'front') y += 180;
		cardRef.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
	}

	function frameBrightness() {
		const { targetBright, currentBright, isOpeningPack } = env.current;
		if (isOpeningPack) return; // the browser can take care of it from now on

		env.current.targetBright--;
		if (targetBright < 0) env.current.targetBright = 0;
		const delta = Math.min(Math.abs(currentBright - targetBright), 4);
		env.current.currentBright += currentBright > targetBright ? -delta : delta;
		backImageRef.current.style.filter = `blur(0px) grayscale(${currentBright / 8}%) brightness(${
			currentBright / 160 + 1
		})`;

		if (env.current.currentBright > 250) openPackAnimation();
	}

	function frame() {
		const { isMounted, isFlippingPack } = env.current;
		if (!cardRef.current) return;
		if (!isMounted) return;

		if (!isFlippingPack) {
			frameVelocity();
			frameBrightness();
		}

		window.requestAnimationFrame(frame);
	}

	function mouseDown(event) {
		const { velocity, angle } = env.current;
		const position = new Vector(event.clientX, event.clientY);
		const screenCenter = new Vector(window.innerWidth / 2, window.innerHeight / 2);
		const diffVector = position.subtract(screenCenter).normalize();

		const touchForce = (angle.magnitude + velocity.magnitude * 100) / 100;
		const deltaVelocity = diffVector.scale(Math.abs(touchForce) > 1 ? 10 / touchForce : 10);
		if (!env.current.isOpeningPack) env.current.targetBright += 60;

		deltaVelocity.mutate.transpose();
		deltaVelocity.x *= -1;
		velocity.mutate.add(deltaVelocity);
	}

	return (
		<div ref={ref} style={{ outline: 'none', perspective: '600px', zIndex: 999 }}>
			<div
				style={{ transformStyle: 'preserve-3d', outline: 'none', transform: 'translate(0, 0)' }}
				className={style.scene}
				ref={cardRef}
			>
				<div
					draggable={false}
					className={style.image}
					ref={backImageRef}
					style={{
						outline: 'none',
						userSelect: 'none',
						backgroundImage: `url('/pack.png')`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						width: '183px',
						height: '315px',
						backfaceVisibility: 'hidden',
						position: 'absolute',
					}}
				/>
				<div
					draggable={false}
					className={style.image}
					ref={frontImageRef}
					style={{
						outline: 'none',
						userSelect: 'none',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundColor: 'transparent',
						width: '183px',
						height: '315px',
						backfaceVisibility: 'hidden',
						transform: 'rotateX(180deg) rotateZ(180deg)',
						position: 'absolute',
					}}
				/>
			</div>
		</div>
	);
});

export default function PacketsModal() {
	const [isPackOpen, setIsPackOpen] = React.useState(false);
	const dispatch = useDispatch();
	const availablePacks = useSelector(state => state.auth.user.availablePacks);
	const cardRef = React.useRef();

	function requestClose() {
		dispatch(ModalActions.closeModal());
	}

	function failure() {
		requestClose();
	}

	function close(event) {
		event.stopPropagation();
		requestClose();
	}

	function next(event) {
		event.stopPropagation();
		setIsPackOpen(false);
		if (availablePacks === 0) requestClose();
		else cardRef.current.reset();
	}

	function openPack() {
		setIsPackOpen(true);
	}

	return (
		<Modal open style={{ zIndex: 100000 }} onEscapeKeyDown={requestClose}>
			<div className={style.root} style={{ outline: 'none' }}>
				<div className={style.header} style={{ zIndex: 9999999 }}>
					<div className={style.textContainer}>
						<div className={style.textLarge}>Você possui {availablePacks} pacotes</div>
						<div className={style.textSmall} style={{ top: '-6px' }}>
							{availablePacks > 0 ? 'Clique nele para abrir' : ''}
						</div>
					</div>
					<div className="ml-2 text-xl" onClick={close}>
						<Close fontSize="large" />
					</div>
				</div>
				<div
					style={{ zIndex: -1 }}
					className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
				>
					{availablePacks > -1 && <Content ref={cardRef} onOpen={openPack} onFailure={failure} />}
				</div>
				{isPackOpen && (
					<div className={style.nextButton} onClick={next}>
						<NavigateNext fontSize="large" />
					</div>
				)}
			</div>
		</Modal>
	);
}
