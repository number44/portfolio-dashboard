import Box from '../../layouts/Box';
import { motion } from 'framer-motion';
import useStore from '../../store/coordinates';
interface PropsI {
	place: SearchResI;
}
const PlaceChoice = ({ place }: PropsI) => {
	const changePlaceChoiceId = useStore((state) => state.changePlaceChoiceId);
	const changeCoordinates = useStore((state) => state.changeCoordinates);
	const PlaceId = useStore((state) => state.placeChoiceId);
	const handler = () => {
		if (place.place_id && place.lat && place.lon) {
			changePlaceChoiceId(place.place_id);
			changeCoordinates(parseFloat(place.lat.slice(0, 10)), parseFloat(place.lon.slice(0, 10)));
		}
	};
	return (
		<motion.div className={` transition-colors duration-300 border-4   cursor-pointer ${place.place_id === PlaceId ? 'border-primary' : 'border-white dark:border-slate-800'}`} whileTap={{ scale: 0.9 }} onClick={handler}>
			<Box>
				<h4 className=" dark:text-zinc-100 text-zinc-800 leading-6">{place.display_name}</h4>
			</Box>
		</motion.div>
	);
};

export default PlaceChoice;
