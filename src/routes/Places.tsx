import Box from '../layouts/Box';
import { useQuery } from 'react-query';
import { fetchPlaces } from '../utils/fetching';
import { VscChromeClose } from 'react-icons/vsc';
import Place from './Map/Place';
interface PropsI {}

const Map = ({}: PropsI) => {
	const { data, isError, isLoading, error } = useQuery<PlaceI[], Error>('notes', fetchPlaces);
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
	const handleDelete = () => {};
	return <div className="grid-cols-3 grid gap-3">{data && data?.map((place) => <Place key={place.id} place={place} />)}</div>;
};
export default Map;
