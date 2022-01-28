import Box from '../../layouts/Box';
import { useMutation, useQuery } from 'react-query';
import { fetchMedia, fetchRooms } from '../../utils/fetching';
import { Link } from 'react-router-dom';
import { VscChromeClose } from 'react-icons/vsc';
import axios from 'axios';
import fileDownload from 'js-file-download';
import queryClient from '../../utils/queryClient';
interface PropsI {}

const Media = ({}: PropsI) => {
	const { data, isError, error, isLoading } = useQuery<MediaI[], Error>('media', fetchMedia);
	const handleDownload = (id: number, name: string) => {
		axios.get(`/files/download/${id}`).then((res) => {
			fileDownload(res.data, name);
		});
	};
	const handleDelete = (id: number) => {
		if (confirm('Na pewno skasować')) {
			mutation.mutate(id);
		}
	};

	const mutation = useMutation(
		(id: number) => {
			return axios.delete(`files/${id}`);
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries('media');
			},
		}
	);

	if (isError) {
		return <h1>Error : {error}</h1>;
	}
	if (isLoading) {
		return <h1>loading</h1>;
	}

	return (
		<>
			<Box className="flex justify-between items-center">
				<h1 className="text-2xl uppercase">Pliki</h1>
				<Link to="/media/add">
					<div className="bg-primary rounded-sm px-3 py-2">Dodaj</div>
				</Link>
			</Box>
			<div className="h-8"></div>
			<div className="gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
				{data?.map((f) => (
					<Box key={f.id} className="flex justify-between">
						<div className="cursor-pointer hover:text-primary" onClick={() => handleDownload(f.id, f.name)}>
							{f.name}
						</div>
						<div onClick={() => handleDelete(f.id)} className=" z-10 text-gray-800 text-2xl   h-full  dark:text-gray-200  flex-center  hover:rotate-180 transition-transform duration-300 cursor-pointer ">
							<VscChromeClose />
						</div>
					</Box>
				))}
			</div>
		</>
	);
};

export default Media;
