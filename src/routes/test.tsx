import axios from 'axios';
import React, { useEffect, useState } from 'react';
interface PropsI {}
const test = ({}: PropsI) => {
	const [data, setData] = useState<any>([]);
	useEffect(() => {
		// axios.get('http://localhost:8000/api/roomtypes/').then((res) => console.log('res :', res));
		fetch('http://localhost:8000/api/roomtypes/').then((res) => console.log('res :', res));
	});
	return <h1>ds</h1>;
};

export default test;
