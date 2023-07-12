import reactDOM from 'react-dom';

type Props = {
	children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
	// SSR 에서 동작 못하도록 처리
	if (typeof window === 'undefined') return null;
	const el = document.querySelector('#portal') as Element;
	return reactDOM.createPortal(children, el);
}
