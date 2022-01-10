import Box from '../layouts/Box';
import useStore from '../store/about';
interface PropsI {}
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
const Home = ({}: PropsI) => {
	const aboutPl = useStore((state) => state.aboutPl);
	const aboutEn = useStore((state) => state.aboutEn);
	const changePl = useStore((state) => state.changeAboutPl);
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
			<motion.div whileHover={{ scale: 0.95 }} className="cursor-pointer">
				<Link to={`/locations/create`}>
					<Box>
						<div className="flex items-center justify-between p-8">
							<h2 className="text-lg text-slate-800 dark:text-slate-200 ">Create Location</h2>
							<BsPlusLg />
						</div>
					</Box>
				</Link>
			</motion.div>
			<motion.div whileHover={{ scale: 0.95 }} className="cursor-pointer">
				<Link to={`/rooms/create`}>
					<Box>
						<div className="flex items-center justify-between p-8">
							<h2 className="text-lg text-slate-800 dark:text-slate-200 ">Create Room</h2>
							<BsPlusLg />
						</div>
					</Box>
				</Link>
			</motion.div>
			<motion.div whileHover={{ scale: 0.95 }} className="cursor-pointer">
				<Link to={`/map/categories`}>
					<Box>
						<div className="flex items-center justify-between p-8">
							<h2 className="text-lg text-slate-800 dark:text-slate-200 ">Create Place Category</h2>
							<BsPlusLg />
						</div>
					</Box>
				</Link>
			</motion.div>
			<motion.div whileHover={{ scale: 0.95 }} className="cursor-pointer">
				<Link to={`/map/create`}>
					<Box>
						<div className="flex items-center justify-between p-8">
							<h2 className="text-lg text-slate-800 dark:text-slate-200 ">Create Place</h2>
							<BsPlusLg />
						</div>
					</Box>
				</Link>
			</motion.div>
			<motion.div whileHover={{ scale: 0.95 }} className="cursor-pointer">
				<Link to={`/media`}>
					<Box>
						<div className="flex items-center justify-between p-8">
							<h2 className="text-lg text-slate-800 dark:text-slate-200 ">Media</h2>
							<BsPlusLg />
						</div>
					</Box>
				</Link>
			</motion.div>
		</div>
	);
};

export default Home;
