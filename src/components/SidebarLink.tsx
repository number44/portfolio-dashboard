import React, { ReactNode } from 'react';
interface PropsI {
	children: ReactNode;
}
const SidebarLink = ({ children }: PropsI) => {
	return <div className="relative text-gray-800  dark:text-gray-200 uppercase flex items-center justify-center sm:justify-between sm:pr-3 leading-8 p-2 font-medium dark:hover:bg-slate-700 hover:bg-slate-100">{children}</div>;
};

export default SidebarLink;
