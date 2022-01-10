import Box from '../layouts/Box';
import { useDropzone } from 'react-dropzone';
import { useEffect } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { fetchRooms } from '../utils/fetching';
import { motion } from 'framer-motion';
interface PropsI {}

const Media = ({}: PropsI) => {
	const { data, isError, error, isLoading } = useQuery<RoomI[], Error>('rooms', fetchRooms);

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
	useEffect(() => {
		console.log('acceptedFiles :', acceptedFiles);
	}, [acceptedFiles]);
	return (
		<div>
			<Box>
				<section className="h-64 flex-center   flex-col  border-4 border-slate-300 border-dotted cursor-pointer">
					<div {...getRootProps({ className: 'dropzone' })}>
						<input {...getInputProps()} />
						<div className="flex flex-col">
							<BiImageAdd className="f text-5xl mb-2 mx-auto" />
							<p>Drag 'n' drop some files here, or click to select files</p>
						</div>
					</div>
				</section>
			</Box>
			<div className="h-8"></div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
				{data?.map((room) => (
					<motion.div key={room.id} whileHover={{ scale: 0.95 }} className="cursor-pointer">
						<Box>
							<img className=" aspect-video" src={room.thumbnail} alt="" />
							<h2 className="text-lg text-slate-800 dark:text-slate-200 mt-2">{room.name}</h2>
						</Box>
					</motion.div>
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
