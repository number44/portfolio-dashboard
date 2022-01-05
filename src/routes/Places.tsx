import Box from '../layouts/Box';
import { useQuery } from 'react-query';
import { fetchPlaces } from '../utils/fetching';
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

	return (
		<div className="grid-cols-3 grid gap-3">
			{data &&
				data?.map((place, index) => (
					<div key={place.id}>
						<Box>
							<h1 className="my-2">Polish : {place.name}</h1>
							<h1 className="my-2">English : {place.ename}</h1>
							<h1 className="my-2">lat : {place.lat}</h1>
							<h1 className="my-2">lon : {place.lon}</h1>
							<h1 className="my-2">category : {place.placetype}</h1>
						</Box>
					</div>
				))}
		</div>
	);
};
export default Map;
