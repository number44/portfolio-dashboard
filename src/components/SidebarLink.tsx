import React, { ReactNode } from 'react';
interface PropsI {
	children: ReactNode;
}
const SidebarLink = ({ children }: PropsI) => {
	return <div className=" text-gray-800  dark:text-gray-200 uppercase flex leading-8  m p-2 font-medium dark:hover:bg-slate-700 hover:bg-slate-100">{children}</div>;
};

export default SidebarLink;
