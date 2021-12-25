import React, { ReactNode } from 'react';
interface PropsI {
	children: ReactNode;
	my?: number;
}
const Box = ({ children, my }: PropsI) => {
	return <section className={` my-${my}  mx-auto bg-white rounded dark:bg-slate-800 shadow-sm p-3 w-full`}>{children}</section>;
};

export default Box;
