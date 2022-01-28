import { NavLink } from 'react-router-dom';
import SidebarLink from '../SidebarLink';
import Back from '../../icons/Back';
import useSideStore from '../../store/sidebarStore';
import { BsPlusLg } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';

import { BsCalendar2Check } from 'react-icons/bs';

interface PropsI {}
const NoteSidebar = ({}: PropsI) => {
	const sidebar = useSideStore((state) => state.sidebar);
	const toggleSide = useSideStore((state) => state.toggleSide);

	return (
		<aside className=" flex flex-col fixed top-0 left-0 w-12 sm:w-48 overflow-x-hidden z-10 h-full pt-16 shadow-lg   bg-white dark:bg-slate-800 ">
			<SidebarLink onClick={() => toggleSide('back')}>
				<Back />
				<span className="hidden sm:block">Powrót</span>
			</SidebarLink>
			<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/reservations">
				<SidebarLink>
					<span className="hidden sm:block ">Rezerwacje</span>
					<BsCalendar2Check className="text-2xl" />
				</SidebarLink>
			</NavLink>

			<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/reservations/create">
				<SidebarLink>
					<span className="hidden sm:block">Dodaj</span>
					<BsPlusLg />
				</SidebarLink>
			</NavLink>
		</aside>
	);
};

export default NoteSidebar;
