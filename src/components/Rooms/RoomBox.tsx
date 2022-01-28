import { motion, AnimatePresence } from 'framer-motion';
import Box from '../../layouts/Box';
import { Link } from 'react-router-dom';
import { VscChromeClose } from 'react-icons/vsc';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import queryClient from '../../utils/queryClient';
import useFreshStore from '../../store/roomStore';

interface PropsI {
	room: RoomI;
	index: number;
}

const RoomBox = ({ room, index }: PropsI) => {
	const refresh = useFreshStore((state) => state.refresh);
	const handleDelete = (id: number) => {
		if (confirm('Jesteś Pewien ??')) mutation.mutate(id);
	};
	const mutation = useMutation(
		(id: number) => {
			return axios.delete(`/rooms/${id}`);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('rooms');
				refresh();
			},
		}
	);

	return (
		<AnimatePresence>
			<motion.div key={room.id} whileHover={{ scale: 0.95 }} initial={{ opacity: 0, scale: 0.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.1 }} transition={{ delay: index / 10 }} className="cursor-pointer relative">
				<Box className="relative pt-10">
					<Link to={`/rooms/${room.id}`}>
						<img className=" aspect-video" src={room.thumbnail} alt="" />
						<h2 className="text-lg text-slate-800 dark:text-slate-200 mt-2">{room.name}</h2>
					</Link>
				</Box>
			</motion.div>
		</AnimatePresence>
	);
};

export default RoomBox;
