import { ReactNode } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import useStore from '../../store/formStore';

interface PropsI {
	children: ReactNode;
	onClick?: () => void;
	active: number;
}
const SidebarCreateLink = ({ children, onClick, active }: PropsI) => {
	const formPart = useStore((state) => state.formPart);
	return (
		<button
			onClick={onClick}
			className={` ${
				active === formPart
			} border-b-2 border-separate border-slate-200 dark:border-slate-600 transition-transform duration-150 hover:scale-105 w-full relative text-gray-800  dark:text-gray-200 uppercase flex items-center justify-center sm:justify-between sm:pr-3 leading-8 p-2 font-medium dark:hover:bg-slate-700 hover:bg-slate-100`}
		>
			{children}
			<BsPlusLg />
		</button>
	);
};

export default SidebarCreateLink;
