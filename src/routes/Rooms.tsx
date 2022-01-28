import { useEffect, useState, ChangeEvent } from 'react';
import { useQueries } from 'react-query';
import Box from '../layouts/Box';
import { fetchRooms, fetchLocations } from '../utils/fetching';
import RoomBox from '../components/Rooms/RoomBox';
import Loader from '../components/Loader';
import useFreshStore from '../store/roomStore';
import queryClient from '../utils/queryClient';
interface PropsI {}
const Rooms = ({}: PropsI) => {
	const fresh = useFreshStore((state) => state.fresh);
	const results = useQueries([
		{ queryKey: ['locations'], queryFn: fetchLocations },
		{ queryKey: ['rooms'], queryFn: fetchRooms },
	]);
	const locations = results[0];
	const data = results[1];

	const [rooms, setRooms] = useState<RoomI[]>([]);
	const handler = (e: ChangeEvent<HTMLSelectElement>) => {
		let val = parseInt(e.target.value);
		const roomsData: RoomI[] = data.data;
		if (val === 0) {
			setRooms(roomsData);
		} else {
			let newArr = roomsData.filter((r) => r.location_id === val);
			console.log('newArr :', newArr);
			setRooms(newArr);
		}
		console.log('rooms :', rooms);
	};

	if (data.isError) {
		return (
			<>
				<Box>Error : {data.error}</Box>
			</>
		);
	}
	if (data.isLoading) {
		return (
			<>
				<Box>
					<Loader />
				</Box>
			</>
		);
	}
	return (
		<>
			<select onChange={(e) => handler(e)} className="dark:bg-zinc-700 my-2  w-full mb-8">
				<option>----</option>
				<option value={0}>Wszystkie Lokalizacje</option>
				{locations &&
					locations?.data.map((cat: LocationI) => (
						<option key={cat.id} value={cat.id}>
							{cat.name}
						</option>
					))}
			</select>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">{rooms && rooms?.map((room, index) => <RoomBox key={room.id} room={room} index={index} />)}</div>
		</>
	);
};

export default Rooms;
