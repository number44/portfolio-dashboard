import { NavLink } from 'react-router-dom';
import SidebarLink from '../SidebarLink';
import Back from '../../icons/Back';
import useSideStore from '../../store/sidebarStore';
import { BsPlusLg } from 'react-icons/bs';
import { GiHouseKeys } from 'react-icons/gi';
import { BiCategory } from 'react-icons/bi';

interface PropsI {}
const RoomSidebar = ({}: PropsI) => {
	const toggleSide = useSideStore((state) => state.toggleSide);
	return (
		<aside className=" gap-1 flex flex-col fixed top-0 left-0 w-12 sm:w-48 overflow-x-hidden z-10 h-full pt-16 shadow-lg   bg-white dark:bg-slate-800 ">
			<SidebarLink onClick={() => toggleSide('null')}>
				<Back />
				<span className="hidden sm:block">Powrót</span>
			</SidebarLink>
			<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/rooms">
				<SidebarLink>
					<span className="hidden sm:block">Pokoje</span>
					<GiHouseKeys className="text-2xl" />
				</SidebarLink>
			</NavLink>
			<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/rooms/create">
				<SidebarLink>
					<span className="hidden sm:block">Nowy</span>
					<BsPlusLg />
				</SidebarLink>
			</NavLink>
			<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/locations">
				<SidebarLink>
					<span className="hidden sm:block">Lokalizacje</span>
					<BiCategory />
				</SidebarLink>
			</NavLink>
			<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/roomtypes">
				<SidebarLink>
					<span className="hidden sm:block">Typy pokojów</span>
					<BiCategory />
				</SidebarLink>
			</NavLink>
			<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/districts">
				<SidebarLink>
					<span className="hidden sm:block">Osiedla</span>
					<BiCategory />
				</SidebarLink>
			</NavLink>
		</aside>
	);
};

export default RoomSidebar;
