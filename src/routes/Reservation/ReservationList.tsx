import { useQuery } from 'react-query';
import Box from '../../layouts/Box';
import { fetchReservations } from '../../utils/fetching';
import Reservation from './Reservation';
interface PropsI {}
const ReservationList = ({}: PropsI) => {
	const { data, isError, isLoading, error } = useQuery<ReservationI[], Error>('reservations', fetchReservations);
	if (isError) {
		return <Box>Error</Box>;
	}
	if (isLoading) {
		return <Box>Is Loading</Box>;
	}

	return (
		<div>
			{data?.map((el) => (
				<Reservation key={el.id} data={el} />
			))}
		</div>
	);
};

export default ReservationList;
