import { useQuery } from 'react-query';
import Box from '../layouts/Box';
import { fetchReservations } from '../utils/fetching';
import ReservationList from './Reservation/ReservationList';
interface PropsI {}
const Reservation = ({}: PropsI) => {
	const { data, isError, isLoading, error } = useQuery<ReservationI[], Error>('reservations', fetchReservations);

	if (isError) {
		return <Box>{error?.message}</Box>;
	}

	if (isLoading) {
		return <Box>{error?.message}</Box>;
	}
	return (
		<>
			<ReservationList />
		</>
	);
};

export default Reservation;

interface ReservationFormI {
	text: string;
	etext: string;
}
