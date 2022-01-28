import { useQuery } from 'react-query';
import Box from '../../layouts/Box';
import { fetchDistricts, fetchRoomtypes } from '../../utils/fetching';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { VscChromeClose } from 'react-icons/vsc';
import axios from 'axios';
import queryClient from '../../utils/queryClient';
interface PropsI {}
const Districts = ({}: PropsI) => {
	const { data, isError, error, isLoading } = useQuery<DistrictI[], Error>(['districts'], fetchDistricts);
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
	function compare(a: DistrictI, b: DistrictI) {
		if (a.id < b.id) {
			return -1;
		}
		if (a.id > b.id) {
			return 1;
		}
		return 0;
	}

	const sortedData = data?.sort(compare);
	const handleDelete = (id: number) => {
		if (confirm('Czy jesteś absolutnie pewien ?')) {
			axios.delete(`/districts/${id}`);
			queryClient.invalidateQueries('districts');
		}
	};
	return (
		<div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
			<motion.div whileHover={{ scale: 0.95 }} className="cursor-pointer">
				<Link to={`/roomtype/create`}>
					<Box>
						<div className="flex-center h-full">
							<AiOutlinePlus className="text-4xl" />
						</div>
					</Box>
				</Link>
			</motion.div>
			{sortedData?.map((roomtype) => (
				<motion.div key={roomtype.id} whileHover={{ scale: 0.95 }} className="cursor-pointer relative">
					<div onClick={() => handleDelete(roomtype.id)} className="text-gray-800 text-2xl  dark:text-gray-200 absolute w-8 h-8 flex-center right-2 top-2 hover:rotate-180 transition-transform duration-300 cursor-pointer ">
						<VscChromeClose />
					</div>
					<Link to={`/districts/${roomtype.id}`}>
						<Box>
							<div className="flex flex-col  items-center justify-between p-8">
								<h2 className="text-lg text-slate-800 dark:text-slate-200 my-2 uppercase ">{roomtype.name}</h2>
								<h2 className="text-lg text-slate-800 dark:text-slate-200 my-2 uppercase ">{roomtype.ename}</h2>
							</div>
						</Box>
					</Link>
				</motion.div>
			))}
		</div>
	);
};

export default Districts;
