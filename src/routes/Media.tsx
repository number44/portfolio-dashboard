import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';

interface PropsI {}
interface MediaI {
	id: number;
	name: string;
	url: string;
	alt: string;
	size: string;
	path: string;
	create_at: string;
	update_at: string;
}
const Media = ({}: PropsI) => {
	const [data, setData] = useState<MediaI[]>();
	const fetchData = () => {
		fetch('http://localhost:8000/api/images/')
			.then((res) => res.json())
			.then((data) => setData(data))
			.catch((error) => console.log('error :', error));
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-3">
				{data?.map((m) => (
					<div key={m.id}>
						<img src={m.url} alt="" />
					</div>
				))}
			</div>
		</div>
	);
};

export default Media;

//  "id": 1,
//         "name": "/tmp/35f51fdb8f537950eacbd2ab6a3b80ce.png",
//         "url": "https://via.placeholder.com/640x480.png/007733?text=consequatur",
//         "alt": "Sunt consequatur in deleniti natus.",
//         "size": "4",
//         "path": "https://via.placeholder.com/640x480.png/00aa55?text=totam",
//         "created_at": "2021-12-19T12:02:11.000000Z",
//         "updated_at": "2021-12-19T12:02:11.000000Z"
