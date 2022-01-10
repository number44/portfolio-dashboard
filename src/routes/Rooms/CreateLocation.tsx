import { useState } from 'react';
import Box from '../../layouts/Box';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import useStore from '../../store/coordinates';
import { useEffect } from 'react';
import SearchMap from '../../components/Places/SearchMap';
import queryClient from '../../utils/queryClient';
import { useMutation } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface PropsI {}
const CreateLocation = ({}: PropsI) => {
	const lat = useStore((state) => state.lat);
	const lon = useStore((state) => state.lon);
	const [url, setUrl] = useState<string>('./Rectangle.svg');
	const [fileF, setFileF] = useState(null);
	const routes = useNavigate();
	const changeCoordinates = useStore((state) => state.changeCoordinates);
	useEffect(() => {
		changeCoordinates(51.759445, 19.457216);
	}, []);
	useEffect(() => {
		setValue('lat', lat);
		setValue('lon', lon);
	}, [lat, lon]);
	const onSubmit: SubmitHandler<LocationI> = (data) => {
		console.log('data :', data);
		mutation.mutate(data);
	};
	const {
		reset,
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<LocationI>({
		defaultValues: {
			lat: lat,
			lon: lon,
		},
	});
	const onChangeFile = (e: any) => {
		const url = URL.createObjectURL(e.target.files[0]);
		setFileF(e.target.files[0]);
		setUrl(url);
	};
	const mutation = useMutation(
		(newData: any) => {
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};
			const formData = new FormData();
			formData.append('name', newData.name ? newData.name : 'name');
			formData.append('ename', newData.ename ? newData.ename : 'ename');
			formData.append('lat', newData.lat ? newData.lat : 'lat');
			formData.append('lon', newData.lon ? newData.lon : 'lon');
			formData.append('thumbnail', fileF ? fileF : 'thumbnail');

			return axios.post('/locations', formData, config);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('loactions');
				routes('/locations');
			},
		}
	);
	return (
		<div className="h-full">
			<Box>
				<div className=" w-full z-10 cursor-pointer">
					<MapContainer className="h-96 z-10" center={[lat, lon]} zoom={13}>
						<RefreshMap lat={lat} lon={lon} zoom={13} />
						<TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						<Marker position={[lat, lon]}>
							<Popup>New Place</Popup>
						</Marker>
					</MapContainer>
				</div>
			</Box>
			<SearchMap />
			<div className="py-4 ">
				<Box>
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-sm mx-auto">
						<label className="icon-image bg-cyan-500 font-semibold cursor-pointer self-center my-3  mt-2 hover:bg-cyan-600 text-zinc-100  rounded-lg">
							<img className=" w-96 aspect-video  object-cover mx-auto rounded-sm dark:bg-slate-700 bg-slate-100" src={url} />
							<input type="file" {...register('thumbnail', { required: true })} onChange={onChangeFile} className="hidden" name="image" />
						</label>
						{errors.thumbnail && <div className=" w-full  text-center text-red-800">thumbnail is required</div>}
						<label htmlFor="name">Polish Name</label>
						<input autoComplete="off" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="text" {...register('name', { required: true, minLength: 4 })} />
						{errors.name && <p className=" w-full  text-red-800 ">Create name min 4 characters</p>}

						<label className="mt-2" htmlFor="name">
							English Name
						</label>

						<input autoComplete="off" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="text" {...register('ename', { required: true, minLength: 4 })} />
						{errors.ename && <p className=" w-full  text-red-800 ">Create name min 4 characters</p>}

						<label className="mt-2" htmlFor="lat">
							Latitude
						</label>

						<input step={0.0000001} autoComplete="off" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="number" {...register('lat', { required: true })} />
						{errors.lat && <p className=" w-full  text-red-800 ">Add latitude</p>}

						<label className="mt-2" htmlFor="lon">
							Longitude
						</label>
						<input step={0.0000001} autoComplete="off" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="number" {...register('lon', { required: true })} />
						{errors.lon && <p className=" w-full  text-red-800 ">Add longitude</p>}

						<input type="submit" value="Create" className="bg-primary font-semibold cursor-pointer w-full   mt-4 hover:opacity-90 mb-4  text-zinc-100 px-3 py-2 rounded-sm" />
					</form>
				</Box>
			</div>
		</div>
	);
};

export default CreateLocation;

interface PropsII {
	lat: number;
	lon: number;
	zoom: number;
}
const RefreshMap = ({ lat, lon, zoom }: PropsII) => {
	const map = useMap();
	map.setView([lat, lon], zoom);
	return null;
};
// lat: 51.759445,
// 	lon: 19.457216,
