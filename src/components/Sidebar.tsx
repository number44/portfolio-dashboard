import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../icons/Image';
import Note from '../icons/Note';
import useStore from '../store/mode';
import SidebarLink from './SidebarLink';
interface PropsI {}
const Sidebar = ({}: PropsI) => {
	const darkmode = useStore((state) => state.darkmode);
	return (
		<aside className=" flex flex-col fixed top-0 left-0 w-12 sm:w-48 overflow-x-hidden z-10 h-full pt-16 shadow-lg   bg-white dark:bg-slate-800 ">
			<Link to="/">
				<SidebarLink>
					<span className="hidden sm:block ">Notes</span>
					<Note />
				</SidebarLink>
			</Link>
			<Link to="/media">
				<SidebarLink>
					<span className="hidden sm:block">Media</span>
					<Image />
				</SidebarLink>
			</Link>
		</aside>
	);
};

export default Sidebar;

// aside {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 160px;
//     overflow-x: hidden;
//     z-index: 1;
//     background: #2c2c2c;
//     padding-top: 70px;
//     height: 100%;
//     color: #ddd;
// }
