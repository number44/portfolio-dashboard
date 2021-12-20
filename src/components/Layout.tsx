import React, { ReactChild, ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
interface PropsI {
	children: ReactNode;
}
const Layout = ({ children }: PropsI) => {
	return (
		<>
			<Navbar />
			<Sidebar />
			<main className="dark:bg-slate-700 bg-slate-100 text-slate-800 dark:text-slate-100 ml-12  sm:ml-48 px-4 pt-20 min-h-screen ">
				<div className="max-w-4xl bg-white rounded dark:bg-slate-800 shadow-sm p-3 mx-auto">{children}</div>
			</main>
		</>
	);
};

export default Layout;
