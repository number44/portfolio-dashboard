import React, { useState, useReducer } from 'react';
import { Link, NavLink, useRoutes } from 'react-router-dom';
import Back from '../icons/Back';
import Image from '../icons/Image';
import Note from '../icons/Note';
import useStore from '../store/mode';
import SidebarLink from './SidebarLink';
import { BiCategory } from 'react-icons/bi';
import { BsPlusLg, BsPinMapFill } from 'react-icons/bs';
const reducer = () => {
	return {
		open: 1,
	};
};

type SideT = string | null;

interface PropsI {}
const Sidebar = ({}: PropsI) => {
	const [state, dispatch] = useReducer(reducer, {
		open: 1,
	});
	const darkmode = useStore((state) => state.darkmode);
	const [sidebar, toggleSide] = useState<SideT>(null);
	const toggleSidebar = (active: SideT) => toggleSide(active);

	return (
		<>
			<aside className=" flex flex-col fixed top-0 left-0 w-12 sm:w-48 overflow-x-hidden z-10 h-full pt-16 shadow-lg   bg-white dark:bg-slate-800 ">
				<NavLink onClick={() => toggleSidebar('map')} className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/map">
					<SidebarLink>
						<span className="hidden sm:block">Places</span>
						<BsPinMapFill />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSidebar('notes')} className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/notes">
					<SidebarLink>
						<span className="hidden sm:block ">Notes</span>
						<Note />
					</SidebarLink>
				</NavLink>
				<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/media">
					<SidebarLink>
						<span className="hidden sm:block">Media</span>
						<Image />
					</SidebarLink>
				</NavLink>
			</aside>
			{sidebar === 'notes' && (
				<aside className=" flex flex-col fixed top-0 left-0 w-12 sm:w-48 overflow-x-hidden z-10 h-full pt-16 shadow-lg   bg-white dark:bg-slate-800 ">
					<SidebarLink onClick={() => toggleSidebar('back')}>
						<Back />
						<span className="hidden sm:block">Go Back</span>
					</SidebarLink>
					<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/notes/categories">
						<SidebarLink>
							<span className="hidden sm:block">Categories</span>
							<BiCategory />
						</SidebarLink>
					</NavLink>
					<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/notes/create">
						<SidebarLink>
							<span className="hidden sm:block">Create</span>
							<BsPlusLg />
						</SidebarLink>
					</NavLink>
				</aside>
			)}
			{sidebar === 'map' && (
				<aside className=" flex flex-col fixed top-0 left-0 w-12 sm:w-48 overflow-x-hidden z-10 h-full pt-16 shadow-lg   bg-white dark:bg-slate-800 ">
					<SidebarLink onClick={() => toggleSidebar('null')}>
						<Back />
						<span className="hidden sm:block">Go Back</span>
					</SidebarLink>
					<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/map/categories">
						<SidebarLink>
							<span className="hidden sm:block">Categories</span>
							<BiCategory />
						</SidebarLink>
					</NavLink>
					<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/map/create">
						<SidebarLink>
							<span className="hidden sm:block">Create</span>
							<BsPlusLg />
						</SidebarLink>
					</NavLink>
				</aside>
			)}
		</>
	);
};

export default Sidebar;
