import { NavLink } from 'react-router-dom';
import SidebarLink from '../SidebarLink';
import Back from '../../icons/Back';
import useSideStore from '../../store/sidebarStore';
import { VscFileSymlinkDirectory } from 'react-icons/vsc';
import { BsPlusLg } from 'react-icons/bs';
interface PropsI {}
const MediaSidebar = ({}: PropsI) => {
	const toggleSide = useSideStore((state) => state.toggleSide);
	return (
		<aside className=" flex flex-col fixed top-0 left-0 w-12 sm:w-48 overflow-x-hidden z-10 h-full pt-16 shadow-lg   bg-white dark:bg-slate-800 ">
			<SidebarLink onClick={() => toggleSide('null')}>
				<Back />
				<span className="hidden sm:block">Powrót</span>
			</SidebarLink>
			<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/media">
				<SidebarLink>
					<span className="hidden sm:block">Pliki</span>
					<VscFileSymlinkDirectory className="text-2xl" />
				</SidebarLink>
			</NavLink>
			<NavLink className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/media/add">
				<SidebarLink>
					<span className="hidden sm:block">Dodaj</span>
					<BsPlusLg />
				</SidebarLink>
			</NavLink>
		</aside>
	);
};

export default MediaSidebar;
