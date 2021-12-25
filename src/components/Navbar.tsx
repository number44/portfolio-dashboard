import { Link, NavLink } from 'react-router-dom';
import Toogle from './Toogle';
interface PropsI {}
const Navbar = ({}: PropsI) => {
	return (
		<header>
			<nav className="dark:bg-gray-800 dark:text-zinc-100 z-20 max-6xl mx-auto bg-white shadow-sm w-full h-16 fixed top-0 flax">
				<div className="brand h-full flex justify-between px-8  items-center">
					<NavLink to="/">Home</NavLink>
					<div className="ml-auto">
						<Toogle />
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
