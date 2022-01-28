import { useState, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import Back from '../icons/Back';
import useStore from '../store/mode';
import SidebarLink from './SidebarLink';
import { BiCategory } from 'react-icons/bi';
import { BsPlusLg, BsPinMapFill, BsCalendar2Check } from 'react-icons/bs';
import { VscFileSymlinkDirectory } from 'react-icons/vsc';
import { GiHouseKeys } from 'react-icons/gi';
import { MdSpeakerNotes, MdOutlineLocalPolice } from 'react-icons/md';
import useSideStore from '../store/sidebarStore';
import NoteSidebar from './Sidebars/NoteSidebar';
import MapSidebar from './Sidebars/MapSidebar';
import MediaSidebar from './Sidebars/MediaSidebar';
import RoomSidebar from './Sidebars/RoomSidebar';
import ReservationSidebar from './Sidebars/ReservationSidebar';
import { AiOutlineFieldTime, AiOutlineFacebook, AiFillFacebook } from 'react-icons/ai';
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
	const sidebar = useSideStore((state) => state.sidebar);
	const toggleSide = useSideStore((state) => state.toggleSide);
	// const [sidebar, toggleSide] = useState<SideT>(null);
	// const toggleSide = (active: SideT) => toggleSide(active);

	return (
		<>
			<aside className=" flex flex-col fixed top-0 left-0 w-12 sm:w-48 overflow-x-hidden z-10 h-full pt-16 shadow-lg   bg-white dark:bg-slate-800 ">
				<NavLink onClick={() => toggleSide('map')} className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/map">
					<SidebarLink>
						<span className="hidden sm:block">Miejsca</span>
						<BsPinMapFill className="text-2xl" />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSide('notes')} className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/notes">
					<SidebarLink>
						<span className="hidden sm:block ">Notatki</span>
						<MdSpeakerNotes className="text-2xl" />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSide('media')} className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/media">
					<SidebarLink>
						<span className="hidden sm:block">Pliki</span>
						<VscFileSymlinkDirectory className="text-2xl" />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSide('rooms')} className={({ isActive }) => (isActive ? ' bg-slate-100 dark:bg-slate-700' : '')} to="/rooms">
					<SidebarLink>
						<span className="hidden sm:block">Pokoje</span>
						<GiHouseKeys className="text-2xl" />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSide('reservations')} className={({ isActive }) => (isActive ? ' bg-slate-100 dark:bg-slate-700' : '')} to="/reservations">
					<SidebarLink>
						<span className="hidden sm:block">Rezerwacje</span>
						<BsCalendar2Check className="text-2xl" />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSide('policy')} className={({ isActive }) => (isActive ? ' bg-slate-100 dark:bg-slate-700' : '')} to="/policy">
					<SidebarLink>
						<span className="hidden sm:block">Zasady</span>
						<MdOutlineLocalPolice className="text-2xl" />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSide('olx')} className={({ isActive }) => (isActive ? ' bg-slate-100 dark:bg-slate-700' : '')} to="/olx">
					<SidebarLink>
						<span className="hidden sm:block">Olx</span>
						<AiOutlineFieldTime className="text-2xl" />
					</SidebarLink>
				</NavLink>

				<NavLink onClick={() => toggleSide('facebook')} className={({ isActive }) => (isActive ? ' bg-slate-100 dark:bg-slate-700' : '')} to="/facebook">
					<SidebarLink>
						<span className="hidden sm:block">Facebook</span>
						<AiOutlineFacebook className="text-2xl" />
					</SidebarLink>
				</NavLink>
			</aside>
			{sidebar === 'notes' && <NoteSidebar />}
			{sidebar === 'map' && <MapSidebar />}
			{sidebar === 'media' && <MediaSidebar />}
			{sidebar === 'rooms' && <RoomSidebar />}
			{sidebar === 'reservations' && <ReservationSidebar />}
		</>
	);
};

export default Sidebar;
