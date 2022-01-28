import { Link, NavLink, useNavigate } from 'react-router-dom';
import Toogle from './Toogle';
import useAuthStore from '../store/authStore';
import { BsChevronDown } from 'react-icons/bs';
import { motion } from 'framer-motion';
interface PropsI {}
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { useState } from 'react';
const AuthNavbar = ({}: PropsI) => {
	const name = useAuthStore((store) => store.name);
	const router = useNavigate();
	const [logout, setLogout] = useState(false);
	const handleLogout = () => {};
	return (
		<header>
			<nav className="dark:bg-gray-800 dark:text-zinc-100 z-20 max-6xl mx-auto bg-white shadow-sm w-full h-16 fixed top-0 flax">
				<div className="brand text-2xl h-full flex  justify-between px-8   items-stretch">
					<div className="flex items-stretch ">
						<NavLink to="/" className=" flex items-center h-full hover:text-primary transition duration-300">
							<BsChevronDoubleLeft />
							<div className={`ml-2`}>Home</div>
						</NavLink>
					</div>
					<div className="ml-auto flex items-center uppercase ">
						<Toogle />
					</div>
				</div>
			</nav>
		</header>
	);
};

export default AuthNavbar;
