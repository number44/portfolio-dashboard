import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Sun, Moon } from '../icons/Icons';
import useStore from '../store/mode';
const Toggle = () => {
	const [enabled, setEnabled] = useState(false);
	const darkmode = useStore((state) => state.darkmode);
	const changeMode = useStore((state) => state.changeMode);
	return (
		<Switch checked={darkmode} onChange={changeMode} className={` toggler border-2 border-white-800   transition-colors ease-in-out duration-200 ${enabled ? 'bg-grey-600' : 'bg-gray-600'}  inline-flex items-center justify-evenly h-8 rounded-full w-14`}>
			<span className="sr-only">Enable notifications</span>
			<span className={`h-6 w-6  transition-transform duration-300  ${darkmode ? 'left' : 'right'}`}></span>
			<Sun />
			<Moon />
		</Switch>
	);
};

export default Toggle;
