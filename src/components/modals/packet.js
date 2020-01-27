import React from 'react'

import { useDispatch } from 'react-redux'

import Modal from '@material-ui/core/Modal'

import { closeModal } from '../../redux/actions/modal'

import Pack from '../../images/pack.png'

const style = {
  root: 'w-screen h-screen flex justify-center items-center px-16 py-32 absolute top-0 left-0',
  scene: 'w-full h-full flex flex-col justify-center items-center',
  card: 'flex outline-none w-full h-full user-select-none absolute justify-center items-center transition cursor-pointer',
  image: 'w-full h-full object-contain'
}

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

class Vector {
  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  static from (...args) {
    if (args.length === 0) {
      return new Vector()
    } else if (args[0] instanceof Array) {
      return new Vector(args[0][0], args[0][1])
    } else if (typeof args[0] === 'number' && typeof args[1] === 'number') {
      return new Vector(args[0], args[1])
    } else if (args[0] instanceof Vector) {
      return args[0].copy()
    }
  }

  duplicate () {
    return new Vector(this.x, this.y)
  }

  set (x, y) {
    this.x = x
    this.y = y
    return this
  }

  get magnitude () {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  get sqrMagnitude () {
    return this.x ** 2 + this.y ** 2
  }

  get normal () {
    return this.duplicate().normalize()
  }

  normalize () {
    const mag = this.magnitude
    this.x /= mag
    this.y /= mag
    return this
  }

  add (vec) {
    return new Vector(this.x + vec.x, this.y + vec.y)
  }

  subtract (vec) {
    return new Vector(this.x - vec.x, this.y - vec.y)
  }

  scale (amount) {
    return new Vector(this.x * amount, this.y * amount)
  }

  get mutate () {
    return {
      add: vec => {
        this.x += vec.x
        this.y += vec.y
        return this
      },

      subtract: vec => {
        this.x -= vec.x
        this.y -= vec.y
        return this
      },

      scale: amount => {
        this.x *= amount
        this.y *= amount
        return this
      },

      transpose: () => {
        const buffer = this.x
        this.x = this.y
        this.y = buffer
      }
    }
  }
}

const Content = React.forwardRef((props, ref) => {
  const cardRef = React.useRef()
  const imageRef = React.useRef()

  const env = React.useRef({
    velocity: new Vector(0, 0),
    angle: new Vector(0, 0),
    currentBright: 0,
    targetBright: 0,
    reachedHeaven: false,
    isMounted: false
  })

  React.useEffect(() => {
    env.current.isMounted = true
    document.addEventListener('mousedown', mouseDown)
    window.requestAnimationFrame(frame)
    return () => {
      document.removeEventListener('mousedown', mouseDown)
      env.current.isMounted = false
    }
  }, [])

  async function goToHeaven () {
    if (env.current.reachedHeaven) return
    console.log('reached heaven')
    env.current.reachedHeaven = true
    env.current.targetBright = 3000
    imageRef.current.style.transition = 'filter 5000ms, background-color 1000ms'
    await sleep(0)
    imageRef.current.style.filter = 'blur(10px) grayscale(100%) brightness(10)'
    imageRef.current.style.backgroundColor = 'white'
    await sleep(1000)
    imageRef.current.style.transition = 'filter 2000ms, background-color 2000ms'
    imageRef.current.style.backgroundImage = 'url(http://place-puppy.com/200x200)'
    imageRef.current.style.backgroundSize = 'cover'
    imageRef.current.style.filter = 'blur(0px) grayscale(0%) brightness(1)'
  }

  function frameVelocity () {
    const { angle, velocity } = env.current
    angle.mutate.add(velocity)
    velocity.mutate.subtract(angle.scale(0.03))
    velocity.mutate.scale(0.95)
    cardRef.current.style.transform = `rotateX(${angle.x}deg) rotateY(${angle.y}deg)`
  }

  function frameBrightness () {
    const { targetBright, currentBright, reachedHeaven } = env.current
    if (reachedHeaven) return // the browser can take care of it from now on

    env.current.targetBright--
    if (targetBright < 0) env.current.targetBright = 0
    const delta = Math.min(Math.abs(currentBright - targetBright), 4)
    env.current.currentBright += currentBright > targetBright ? -delta : delta
    imageRef.current.style.filter = `blur(0px) grayscale(${currentBright / 8}%) brightness(${currentBright / 160 + 1})`

    if (env.current.currentBright > 250) goToHeaven()
  }

  function frame () {
    const { isMounted } = env.current

    frameVelocity()
    frameBrightness()

    if (isMounted) window.requestAnimationFrame(frame)
  }

  function mouseDown (event) {
    const { velocity, angle } = env.current
    const position = new Vector(event.clientX, event.clientY)
    const screenCenter = new Vector(window.innerWidth / 2, window.innerHeight / 2)
    const diffVector = position.subtract(screenCenter).normalize()

    const touchForce = (angle.magnitude + velocity.magnitude * 100) / 100
    const deltaVelocity = diffVector.scale(Math.abs(touchForce) > 1 ? 10 / touchForce : 10)
    if (!env.current.reachedHeaven) env.current.targetBright += 60

    deltaVelocity.mutate.transpose()
    deltaVelocity.x *= -1
    velocity.mutate.add(deltaVelocity)
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
          ref={imageRef}
          style={{
            outline: 'none',
            userSelect: 'none',
            backgroundImage: `url(${Pack})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '244px',
            height: '420px'
          }}
        />
      </div>
    </div>
  )
})

export default function PacketsModal () {
  function requestClose () {
  }

  return (
    <Modal open onClose={requestClose} className={style.root}>
      <div style={{ outline: 'none' }}>
        <Content />
      </div>
    </Modal>
  )
}
