type Props = {
	disabled?: boolean;
	text: string;
	onClick: () => void;
	red?: boolean;
};

export default function Button({ disabled = false, text, onClick, red }: Props) {
	return (
		<button disabled={disabled} className={`${disabled && 'opacity-80'} ${red ? 'bg-red-500' : 'bg-sky-500'} border-none rounded-md py-2 px-8 text-white font-bold leading-4`} onClick={() => onClick()}>
			{text}
		</button>
	);
}
