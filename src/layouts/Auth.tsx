import React, { ReactChild, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
interface PropsI {
	children: ReactNode;
}
const Auth = () => {
	return (
		<>
			<Navbar />
			<main className=" dark:bg-slate-700 bg-slate-100 text-slate-800 dark:text-slate-100  px-4 pt-20 min-h-screen h-full">
				<div className="max-w-5xl mx-auto">
					<Outlet />
				</div>
			</main>
		</>
	);
};

export default Auth;
