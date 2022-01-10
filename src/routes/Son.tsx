import { useEffect, useState } from 'react';
import axios from 'axios';
import PepProperty from '../components/Rooms/PepProperty';

interface PropsI {}
const Son = ({}: PropsI) => {
	const [data, setData] = useState<PpropertyI[] | null>(null);
	useEffect(() => {
		fetchSon();
	}, []);
	const fetchSon = () => {
		axios.get('/pep').then((data) => setData(data.data.url.rooms.property));
	};
	return <div className=" pb-8 mx-auto grid grid-cols-1 gap-3 max-w-2xl bg-white dark:bg-slate-600 shadow-sm p-4">{data && data.map((property) => <PepProperty property={property} key={property.estate_id} />)}</div>;
};

export default Son;
