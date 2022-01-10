import { Link, NavLink } from 'react-router-dom';
import Toogle from './Toogle';
interface PropsI {}
import { BsChevronDoubleLeft } from 'react-icons/bs';
const Navbar = ({}: PropsI) => {
	return (
		<header>
			<nav className="dark:bg-gray-800 dark:text-zinc-100 z-20 max-6xl mx-auto bg-white shadow-sm w-full h-16 fixed top-0 flax">
				<div className="brand text-2xl h-full flex justify-between px-8  items-center">
					<div className="flex items-center">
						<NavLink to="/" className="flex items-center hover:text-primary transition duration-300">
							<BsChevronDoubleLeft />
							<div className={`ml-2`}>Home</div>
						</NavLink>
					</div>
					<div className="ml-auto">
						<Toogle />
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
