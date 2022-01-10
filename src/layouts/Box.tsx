import React, { ReactNode } from 'react';
interface PropsI {
	children: ReactNode;
	my?: number;
	onClick?: () => void;
}
const Box = ({ children, my, onClick }: PropsI) => {
	return (
		<section onClick={onClick} className={` my-${my}  mx-auto bg-white rounded dark:bg-slate-800 shadow-sm p-3 w-full h-full`}>
			{children}
		</section>
	);
};

export default Box;
