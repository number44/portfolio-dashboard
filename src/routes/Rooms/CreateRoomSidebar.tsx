import SidebarCreateLink from '../../components/Rooms/SidebarCreateLink';

import useFormStore from '../../store/formStore';
interface PropsI {}

const CreateRoomSidebar = ({}: PropsI) => {
	const setFormPart = useFormStore((store) => store.setFormPart);
	return (
		<div className="flex flex-col fixed top-0 left-0 w-12 sm:w-48 overflow-x-hidden z-10 h-full pt-16 shadow-lg bg-white dark:bg-slate-800">
			<SidebarCreateLink active={0} onClick={() => setFormPart(0)}>
				<span className="hidden sm:block">Ogólne</span>
			</SidebarCreateLink>
			<SidebarCreateLink active={1} onClick={() => setFormPart(1)}>
				<span className="hidden sm:block">Ceny</span>
			</SidebarCreateLink>
			<SidebarCreateLink active={2} onClick={() => setFormPart(2)}>
				<span className="hidden sm:block">Opis</span>
			</SidebarCreateLink>
			<SidebarCreateLink active={3} onClick={() => setFormPart(3)}>
				<span className="hidden sm:block">Wyposażenie</span>
			</SidebarCreateLink>
		</div>
	);
};

export default CreateRoomSidebar;
