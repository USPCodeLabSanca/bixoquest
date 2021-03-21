import { toast } from 'react-toastify';
export * from './auth'

/**
 * Shows an error toast to every error provided
 * @param { string[] } errors
 */
export function toastifyErrors (errors) {
	if (!errors || errors.length === 0) return;

	const errorElements = errors.map((error, index) => (
		<span key={index}>{error}<br /></span>
	));

	toast.error(<>{errorElements}</>);
}
