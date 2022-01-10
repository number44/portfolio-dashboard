import { useEffect } from 'react';
import { useQuery } from 'react-query';
import Box from '../layouts/Box';
import { fetchRooms } from '../utils/fetching';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
interface PropsI {}
const Rooms = ({}: PropsI) => {
	const { data, isError, error, isLoading } = useQuery<RoomI[], Error>('rooms', fetchRooms);
	useEffect(() => {
		console.log('data!!! :', data);
	}, []);
	if (isError) {
		return (
			<>
				<Box>Error : {error?.message}</Box>
			</>
		);
	}
	if (isLoading) {
		return (
			<>
				<Box>Loading...</Box>
			</>
		);
	}
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
			{data?.map((room) => (
				<motion.div key={room.id} whileHover={{ scale: 0.95 }} className="cursor-pointer">
					<Link to={`/rooms/${room.id}`}>
						<Box>
							<img className=" aspect-video" src={room.thumbnail} alt="" />
							<h2 className="text-lg text-slate-800 dark:text-slate-200 mt-2">{room.name}</h2>
						</Box>
					</Link>
				</motion.div>
			))}
		</div>
	);
};

export default Rooms;
