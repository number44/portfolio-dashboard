import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../../store/sondata';
import { useNavigate } from 'react-router-dom';
interface PropsI {
	room: ProomI;
}
const PepRoom = ({ room }: PropsI) => {
	const chamgeSonData = useStore((state) => state.changeSonData);
	const router = useNavigate();
	const handler = () => {
		chamgeSonData(room.room_id, room.title, room.price.per_month, room.availability.start_date);
		router('/rooms/create');
	};
	return (
		<motion.div onClick={handler} className="dark:bg-slate-700 bg-zinc-100 shadow-sm p-3 cursor-pointer" whileHover={{ scale: 0.9 }} key={room.room_id}>
			{room.title}
		</motion.div>
	);
};

export default PepRoom;
