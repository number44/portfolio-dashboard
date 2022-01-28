import React, { ReactNode } from 'react';
interface PropsI {
	children: ReactNode;
	my?: number;
	onClick?: () => void;
	className?: string;
}
const Box = ({ children, className, onClick }: PropsI) => {
	return (
		<section onClick={onClick} className={` ${className}   mx-auto bg-white rounded dark:bg-slate-800 shadow-sm  w-full h-full`}>
			{children}
		</section>
	);
};

export default Box;
