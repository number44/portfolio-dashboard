import React from 'react';
interface PropsI {
	primary?: boolean;
	secondary?: boolean;
	value: string;
	type?: string;
	onClick?: () => void;
}
const Button = ({ primary, type, secondary, value, onClick }: PropsI) => {
	if (secondary) {
		return (
			<button onClick={onClick} className="bg-red-700 font-semibold cursor-pointer  hover:bg-red-600 text-zinc-100 px-3 py-2 rounded-sm">
				{value}
			</button>
		);
	}

	return (
		<button onClick={onClick} className="bg-cyan-500 font-semibold cursor-pointer  hover:bg-cyan-600 text-zinc-100 px-3 py-2 rounded-sm">
			{value}
		</button>
	);
};

export default Button;
