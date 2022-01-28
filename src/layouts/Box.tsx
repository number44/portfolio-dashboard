import React, { ReactNode } from 'react';
interface PropsI {
	children: ReactNode;
	my?: number;
	onClick?: () => void;
	className?: string;
}
const Box = ({ children, className, my, onClick }: PropsI) => {
	return (
		<section onClick={onClick} className={` ${className}   mx-auto bg-white rounded dark:bg-slate-800 shadow-sm p-3 w-full h-full`}>
			{children}
		</section>
	);
};

export default Box;
