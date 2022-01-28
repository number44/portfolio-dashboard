import { Link, NavLink, useNavigate } from 'react-router-dom';
import Toogle from './Toogle';
import useAuthStore from '../store/authStore';
import { BsChevronDown } from 'react-icons/bs';
import { motion } from 'framer-motion';
interface PropsI {}
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { useState } from 'react';
import axios from 'axios';
const Navbar = ({}: PropsI) => {
	const name = useAuthStore((store) => store.name);
	const email = useAuthStore((store) => store.email);

	const router = useNavigate();
	const [logout, setLogout] = useState(false);
	const handleLogout = () => {
		axios.post('/auth/logout', { email: email }).then((data) => {
			router('/auth/login');
		});
	};
	return (
		<header>
			{logout && <div onClick={() => setLogout(false)} className="  fixed left-0 top-0 w-full h-full z-20"></div>}
			<nav className="dark:bg-gray-800 dark:text-zinc-100 z-20 max-6xl mx-auto bg-white shadow-sm w-full h-16 fixed top-0 flax">
				<div className="brand text-2xl h-full flex  justify-between px-8   items-stretch">
					<div className="flex items-stretch ">
						<NavLink to="/" className=" flex items-center h-full hover:text-primary transition duration-300">
							<BsChevronDoubleLeft />
							<div className={`ml-2`}>Home</div>
						</NavLink>
					</div>
					<div className="ml-auto flex items-center uppercase ">
						<div className="relative mr-4 text-base flex items-center  h-full cursor-pointer  transition-colors duration-100">
							<div onClick={() => setLogout(!logout)} className="flex items-center px-4  h-full hover:text-primary">
								<h1 className="pr-2">{name}</h1>
								<BsChevronDown />
							</div>
							<motion.button
								onClick={handleLogout}
								animate={{ y: logout ? 30 : 0, visibility: logout ? 'visible' : 'hidden' }}
								className="z-30 hover:bg-slate-200 dark:bg-slate-500 dark:hover:bg-slate-400  px-3 py-2 absolute right-0 bottom-0 mr-4 rounded  origin-bottom translate-y-full   dark:text-zinc-100 bg-white  shadow-lg   shadow-gray-300 dark:shadow-slate-700  "
							>
								Logout
							</motion.button>
						</div>
						<Toogle />
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
