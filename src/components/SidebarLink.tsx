import React, { ReactNode } from 'react';
interface PropsI {
	children: ReactNode;
	onClick?: () => void;
}
const SidebarLink = ({ children, onClick }: PropsI) => {
	return (
		<button onClick={onClick} className="hover:scale-105 w-full relative text-gray-800  dark:text-gray-200 uppercase flex items-center justify-center sm:justify-between sm:pr-3 leading-8 p-2 font-medium dark:hover:bg-slate-700 hover:bg-slate-100">
			{children}
		</button>
	);
};

export default SidebarLink;
