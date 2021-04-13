import React from 'react';
import { useMultistep } from '../../../components/multistep-form/context';
import { toast } from 'react-toastify';
import Routes from '../../../constants/routes';
import useClipboard from 'react-use-clipboard';

const style = {
	root: 'h-full w-full',
	title: 'text-center text-lg w-full h-content px-4',
	container: 'h-full w-full flex justify-center items-center',
	code: {
		position: 'absolute',
		zIndex: 99999,
	},
	linkContainer: 'rounded-xl border border-black p-2 m-2 break-all text-blue-400',
};

const targetLinkURL = new URL(window.location.href);
targetLinkURL.pathname = Routes.receiveCards;
targetLinkURL.hash = '';
targetLinkURL.search = '';

export default function Link() {
	const { formValue } = useMultistep();
	console.log(formValue, targetLinkURL);
	const link = targetLinkURL.toString() + '?token=' + formValue.token;
	console.log(link);
	const [isCopied, setCopied] = useClipboard(link, { successDuration: 100 });

	React.useEffect(() => {
		if (!isCopied) return;
		toast.success('Link copiado com sucesso!');
	}, [isCopied]);

	return (
		<div className={style.root}>
			<div className={style.title}>
				Para completar esta doação, envie este link para a pessoa que receberá a doação. Clique no
				link para copiar-lo
			</div>
			<div className={style.linkContainer} onClick={setCopied}>
				{link}
			</div>
		</div>
	);
}
