import { NavLink } from 'react-router-dom';
import SidebarLink from '../SidebarLink';
import Back from '../../icons/Back';
import useSideStore from '../../store/sidebarStore';
import { BsPinMapFill, BsPlusLg } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';

interface PropsI {}
const MapSidebar = ({}: PropsI) => {
	const toggleSide = useSideStore((state) => state.toggleSide);
	return (
		<aside className=" flex flex-col fixed top-0 left-0 w-12 sm:w-48 overflow-x-hidden z-10 h-full pt-16 shadow-lg   bg-white dark:bg-slate-800 ">
			<SidebarLink onClick={() => toggleSide('null')}>
				<Back />
				<span className="hidden sm:block">Powrót</span>
			</SidebarLink>
			<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/map/">
				<SidebarLink>
					<span className="hidden sm:block">Miejsca</span>
					<BsPinMapFill className="text-2xl" />
				</SidebarLink>
			</NavLink>

			<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/map/categories">
				<SidebarLink>
					<span className="hidden sm:block">Kategorie</span>
					<BiCategory />
				</SidebarLink>
			</NavLink>
			<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/map/create">
				<SidebarLink>
					<span className="hidden sm:block">Utwórz</span>
					<BsPlusLg />
				</SidebarLink>
			</NavLink>
		</aside>
	);
};

export default MapSidebar;
