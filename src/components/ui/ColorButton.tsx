type Props = {
	text: string;
	size?: 'small' | 'big';
	onClick: () => void;
};
export default function ColorButton({ text, size = 'small', onClick }: Props) {
	return (
		<div className={`${size === 'big' ? 'p-[0.3rem]' : 'p-[0.15rem]'} rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300`}>
			<button className={`${size === 'big' ? 'p-4 text-2xl' : 'p-[0.3rem] text-base'} rounded-sm bg-white hover:opacity-90 transition-opacity`} onClick={onClick}>
				{text}
			</button>
		</div>
	);
}
