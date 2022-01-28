import CreateRoomSidebar from './CreateRoomSidebar';

import { useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import debounce from 'lodash/debounce';
import { useState, useRef, Fragment } from 'react';
import Box from '../../layouts/Box';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../store/sondata';
import { useEffect } from 'react';
import { useMutation, useQueries, useQuery } from 'react-query';
import queryClient from '../../utils/queryClient';
import axios from 'axios';
import { fetchDistricts, fetchLocations, fetchRoom, fetchRoomtypes } from '../../utils/fetching';
import EditorAboutEn from '../../components/Rooms/EditorAboutEn';
import EditorAboutPl from '../../components/Rooms/EditorAboutPl';
import { motion } from 'framer-motion';
import useAboutStore from '../../store/about';
import { IoIosImages } from 'react-icons/io';
interface PropsI {}
const Room = ({}: PropsI) => {
	const params = useParams();
	if (!params.id) {
		return <Box>Error no data</Box>;
	}
	const newId = parseInt(params.id);
	const { data, isError, isLoading, error } = useQuery<RoomI, Error>(['room', newId], () => fetchRoom(newId));
	const [dataRoom, setDataRoom] = useState<RoomI | null>(null);

	useEffect(() => {
		if (data) {
			setDataRoom(data);
		}
	}, [data]);
	const [lang, setLang] = useState<string>('pl');
	const routes = useNavigate();
	const [url, setUrl] = useState<string>('./Rectangle.svg');
	const [fileF, setFileF] = useState(null);
	const results = useQueries([
		{ queryKey: ['locations'], queryFn: fetchLocations },
		{ queryKey: ['roomtypes'], queryFn: fetchRoomtypes },
		{ queryKey: ['districts'], queryFn: fetchDistricts },
	]);
	const AboutPlRef = useRef<UploadEditorStateI>(null);
	const AboutEnRef = useRef<UploadEditorStateI>(null);
	/**
	 * xxxx
	 */
	const [datapropPl, setDatapropPl] = useState<string>('');
	const [datapropEn, setDatapropEn] = useState<string>('');
	const districtData: DistrictI[] = results[2].data;

	const roomtypeData: RoomtypeI[] = results[1].data;
	const locationData: LocationI[] = results[0].data;

	const name = useStore((state) => state.title);
	const price = useStore((state) => state.price);
	const availability = useStore((state) => state.availability);
	const son_id = useStore((state) => state.room_id);
	const AboutPl = useAboutStore((state) => state.aboutPl);
	const AboutEn = useAboutStore((state) => state.aboutEn);
	const changeAboutPl = useAboutStore((state) => state.changeAboutPl);
	const changeAboutEn = useAboutStore((state) => state.changeAboutEn);

	// Searching
	const searchRef = useRef<HTMLInputElement>(null);
	const [searchRes, setSearchRes] = useState<RoomI[] | null>(null);
	const [showList, toggleList] = useState<boolean>(false);
	const [searchResult, setSearchResult] = useState<RoomI | null>(null);
	useEffect(() => {
		changeAboutPl('');
		changeAboutEn('');
		if (!dataRoom) {
			return;
		}
		AboutPlRef.current?.clean();
		if (searchRef.current?.value) {
			searchRef.current.value = dataRoom?.name;
		}
		setUrl(dataRoom.thumbnail);
		setDatapropPl(dataRoom.about);
		setDatapropEn(dataRoom.eabout);
		AboutPlRef.current?.uploadEditor();
		AboutEnRef.current?.uploadEditor();
		setValue('name', dataRoom.name);
		setValue('ename', dataRoom.ename);
		setValue('price', dataRoom.price);
		setValue('availability', dataRoom.availability);
		setValue('roomtype_id', dataRoom.roomtype_id);
		setValue('district_id', dataRoom.district_id);
		setValue('location_id', dataRoom.location_id);
		setValue('info', dataRoom.info);
		setValue('einfo', dataRoom.einfo);

		setValue('internet', dataRoom.internet);
		setValue('tv', dataRoom.tv);
		setValue('washing_machine', dataRoom.washing_machine);
		setValue('dryer', dataRoom.dryer);
		setValue('parking', dataRoom.parking);
		setValue('elevator', dataRoom.elevator);
		setValue('oven', dataRoom.oven);
		setValue('equipped_kitchen', dataRoom.equipped_kitchen);
		setValue('locales', dataRoom.locales);
		setValue('beds', dataRoom.beds);
		setValue('guests', dataRoom.guests);
		setValue('bathrooms', dataRoom.bathrooms);

		setValue('b_costs', dataRoom.b_costs);
		setValue('b_deposit', dataRoom.b_deposit);
		setValue('b_electricity', dataRoom.b_electricity);
		setValue('b_gas', dataRoom.b_gas);
		setValue('b_internet', dataRoom.b_internet);
		setValue('b_taxes', dataRoom.b_taxes);
		setValue('b_water', dataRoom.b_water);

		setValue('price_2', dataRoom.price_2);
		setValue('price_3', dataRoom.price_3);
		setValue('price_4', dataRoom.price_4);
	}, [dataRoom]);

	useEffect(() => {
		if (searchResult && searchRef.current?.value) {
			AboutPlRef.current?.clean();
			searchRef.current.value = searchResult?.name;
			setDatapropPl(searchResult.about);
			setDatapropEn(searchResult.eabout);
			AboutPlRef.current?.uploadEditor();
			AboutEnRef.current?.uploadEditor();
			setValue('roomtype_id', searchResult.roomtype_id);
			setValue('district_id', searchResult.district_id);

			setValue('info', searchResult.info);
			setValue('einfo', searchResult.einfo);

			setValue('internet', searchResult.internet);
			setValue('tv', searchResult.tv);
			setValue('washing_machine', searchResult.washing_machine);
			setValue('dryer', searchResult.dryer);
			setValue('parking', searchResult.parking);
			setValue('elevator', searchResult.elevator);
			setValue('oven', searchResult.oven);
			setValue('equipped_kitchen', searchResult.equipped_kitchen);
			setValue('locales', searchResult.locales);
			setValue('beds', searchResult.beds);
			setValue('guests', searchResult.guests);
			setValue('bathrooms', searchResult.bathrooms);

			setValue('b_costs', searchResult.b_costs);
			setValue('b_deposit', searchResult.b_deposit);
			setValue('b_electricity', searchResult.b_electricity);
			setValue('b_gas', searchResult.b_gas);
			setValue('b_internet', searchResult.b_internet);
			setValue('b_taxes', searchResult.b_taxes);
			setValue('b_water', searchResult.b_water);

			setValue('price_2', searchResult.price_2);
			setValue('price_3', searchResult.price_3);
			setValue('price_4', searchResult.price_4);
		}
	}, [searchResult]);
	const searchHandler = debounce(() => {
		if (searchRef.current?.value) {
			axios.get(`/rooms/search/${searchRef.current?.value}`).then((data) => setSearchRes(data.data.data));
		}
	}, 300);
	const closeSearch = () => {
		setTimeout(() => toggleList(false), 200);
	};

	const onChangeFile = (e: any) => {
		const url = URL.createObjectURL(e.target.files[0]);
		setFileF(e.target.files[0]);
		setUrl(url);
	};

	const {
		reset,
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<RoomI>();

	const onSubmit: SubmitHandler<RoomI> = (data) => {
		AboutPlRef.current?.uploadEditor();
		AboutEnRef.current?.uploadEditor();
		mutation.mutate(data);
	};
	const mutation = useMutation(
		(newData: RoomI) => {
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};
			const formData = new FormData();

			formData.append('thumbnail', fileF ? fileF : 'thumbnail');

			formData.append('son_id', son_id.toString());
			formData.append('location_id', newData.location_id.toString());
			formData.append('roomtype_id', newData.roomtype_id.toString());
			formData.append('district_id', newData.district_id.toString());

			formData.append('name', newData.name);
			formData.append('ename', newData.ename);

			formData.append('price', newData.price.toString());
			formData.append('availability', newData.availability);

			formData.append('internet', newData.internet ? 'true' : 'false');
			formData.append('tv', newData.tv ? 'true' : 'false');
			formData.append('washing_machine', newData.washing_machine ? 'true' : 'false');
			formData.append('dryer', newData.dryer ? 'true' : 'false');
			formData.append('parking', newData.parking ? 'true' : 'false');
			formData.append('elevator', newData.elevator ? 'true' : 'false');
			formData.append('oven', newData.oven ? 'true' : 'false');
			formData.append('equipped_kitchen', newData.equipped_kitchen ? 'true' : 'false');

			formData.append('locales', newData.locales.toString());
			formData.append('beds', newData.beds.toString());
			formData.append('guests', newData.guests.toString());
			formData.append('bathrooms', newData.bathrooms.toString());

			formData.append('about', AboutPl);
			formData.append('eabout', AboutEn);

			formData.append('info', newData.info);
			formData.append('einfo', newData.einfo);

			formData.append('b_internet', newData.b_internet ? 'true' : 'false');
			formData.append('b_water', newData.b_water ? 'true' : 'false');
			formData.append('b_electricity', newData.b_electricity ? 'true' : 'false');
			formData.append('b_gas', newData.b_gas ? 'true' : 'false');
			formData.append('b_taxes', newData.b_taxes ? 'true' : 'false');

			formData.append('b_costs', newData.b_costs.toString());
			formData.append('b_deposit', newData.b_deposit.toString());

			formData.append('price_2', newData.price_2.toString());
			formData.append('price_3', newData.price_3.toString());
			formData.append('price_4', newData.price_4.toString());

			console.log('formData :', formData);

			return axios.post(`/rooms/${newId}`, formData, config);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('rooms');
				routes('/rooms');
			},
		}
	);
	return (
		<>
			<CreateRoomSidebar />
			<div className="h-4"></div>
			<Box>
				<Link to={`/rooms/gallery/${newId}`}>
					<motion.button whileHover={{ scale: 0.95 }} className="text-2xl w-full flex flex-col items-center  font-semibold cursor-pointer  bg-primary hover:opacity-9 text-zinc-100 px-3 py-2 rounded-sm">
						<h1 className="mb-2">GALERIA</h1>
						<IoIosImages className="text-4xl" />
					</motion.button>
				</Link>
			</Box>
			<div className="h-4"></div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="max-w-2xl mx-auto">
					<Box>
						<label htmlFor="name">
							Polska nazwa
							<input {...register('name', { required: true, minLength: 3 })} autoComplete="off" type="text" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
						</label>
						<label htmlFor="ename">Angielska nazwa</label>
						<input {...register('ename', { required: true, minLength: 3 })} autoComplete="off" type="text" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
						<label htmlFor="price">Price</label>
						<input {...register('price')} type="number" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
						<label htmlFor="availability">Availability</label>
						<input {...register('availability')} type="date" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
					</Box>
					<div className="h-4"></div>

					<div className="h-4"></div>
					<div className="flex flex-col max-w-sm mx-auto">
						<label className="icon-image bg-cyan-500 font-semibold cursor-pointer self-center my-3  mt-2 hover:bg-cyan-600 text-zinc-100  rounded-lg">
							<img className=" w-96 aspect-video  object-cover mx-auto rounded-sm dark:bg-slate-700 bg-slate-100" src={url} />
							<input type="file" {...register('thumbnail')} onChange={onChangeFile} className="hidden" name="image" />
						</label>
					</div>
					<div className="h-4"></div>
					<Box>
						<label htmlFor="location_id">Location</label>
						<select className="dark:bg-zinc-700 my-2  w-full" {...register('location_id', { required: true })}>
							{locationData &&
								locationData?.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
						</select>
					</Box>
					<div className="h-4"></div>
					<Box>
						<label htmlFor="location_id">District</label>
						<select className="dark:bg-zinc-700 my-2  w-full" {...register('district_id', { required: true })}>
							{districtData &&
								districtData?.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
						</select>
					</Box>

					<div className="h-4"></div>
					<Box>
						<h1 className="pb-8  pt-4 pl-3 text-2xl font font-medium">Complete the data from : </h1>
						<label htmlFor="search" className="relative">
							Search
							<input onFocus={() => toggleList(true)} onBlur={closeSearch} type="text" name="search" ref={searchRef} onChange={searchHandler} autoComplete="off" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							<ul className="absolute w-full  list-none shadow-lg left-0 bg-slate-100 dark:bg-slate-600">
								{showList &&
									searchRes?.map((s, index) => (
										<li onClick={() => setSearchResult(s)} className="p-3 hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors duration-100 cursor-pointer " key={index}>
											{s.name}
										</li>
									))}
							</ul>
						</label>
					</Box>

					<div className="h-4"></div>

					<Box>
						<h1 className="pb-8  pt-4 pl-3 text-2xl font font-medium">About Room : </h1>

						<div className="grid grid-cols-2 py-3 gap-3">
							<div onClick={() => setLang('pl')} className={`${lang === 'pl' ? 'dark:bg-slate-700 bg-slate-100' : ''} py-3 text-center cursor-pointer transition-colors duration-300`}>
								PL
							</div>
							<div onClick={() => setLang('en')} className={`${lang === 'en' ? 'dark:bg-slate-700 bg-slate-100' : ''} py-3 text-center cursor-pointer transition-colors duration-300`}>
								EN
							</div>
						</div>
						<div>
							<div className={`${lang === 'pl' ? 'visible' : 'invisible hidden'}`}>
								<EditorAboutPl dataprop={datapropPl} ref={AboutPlRef} />
							</div>
							<div className={`${lang === 'en' ? 'visible' : 'invisible hidden'}`}>
								<EditorAboutEn dataprop={datapropEn} ref={AboutEnRef} />
							</div>
						</div>
					</Box>
					<div className="h-4"></div>

					<Box>
						<h1 className="pb-8  pt-4 pl-3 text-2xl font font-medium">Equipment</h1>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
							<div className="flex justify-start items-center p-3">
								<input {...register('internet')} className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									Internet
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input {...register('tv')} className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									tv
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input {...register('washing_machine')} className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									washing machine
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input {...register('dryer')} className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									dryer
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input {...register('parking')} className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									parking
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input {...register('elevator')} className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									elevator
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input {...register('oven')} className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									oven
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " {...register('equipped_kitchen')} type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									equipped kitchen
								</label>
							</div>
						</div>
					</Box>
					<div className="h-4"></div>
					<Box>
						<label htmlFor="roomtype_id">Room Type</label>
						<select className="dark:bg-zinc-700 my-2  w-full" {...register('roomtype_id', { required: true })}>
							{roomtypeData &&
								roomtypeData?.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
						</select>
					</Box>
					<div className="h-4"></div>
					<Box>
						<h1 className="pb-8  pt-4 pl-3 text-2xl font font-medium">Prices</h1>
						<div className="grid grid-cols-1 max-w-md mx-auto sm:grid-cols-1 gap-3 sm:gap-8 px-3 pb-4">
							<label htmlFor="rooms">
								Rent for 2 until 6 months
								<input type="number" {...register('price_2', { required: true })} className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
							<label htmlFor="price">
								Rent for 1 until 2 months
								<input type="number" {...register('price_3', { required: true })} className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
							<label htmlFor="price">
								Rent for 6 months and more
								<input {...register('price_4', { required: true })} type="number" className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
						</div>
					</Box>
					<div className="h-4"></div>

					<Box>
						<h1 className="pb-8  pt-4 pl-3 text-2xl font font-medium">Additional Costs</h1>
						<div className="grid grid-cols-1 max-w-md mx-auto sm:grid-cols-1 gap-3 sm:gap-8 px-3 pb-4">
							<label htmlFor="rooms">
								Monthly bills per person
								<input {...register('b_costs', { required: true })} type="number" className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
							<label htmlFor="price">
								Security deposit
								<input {...register('b_deposit', { required: true })} type="number" className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
						</div>
					</Box>
					<div className="h-4"></div>
					<Box>
						<h1 className="pb-8  pt-4 pl-3 text-2xl font font-medium">Info</h1>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8 px-3 pb-4">
							<label htmlFor="rooms">
								Rooms
								<input {...register('locales')} type="number" className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
							<label htmlFor="price">
								Beds
								<input {...register('beds')} type="number" className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
							<label htmlFor="price">
								Visitors
								<input {...register('guests')} type="number" className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
							<label htmlFor="price">
								Bathrooms
								<input {...register('bathrooms')} type="number" className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
						</div>
					</Box>
					<div className="h-4"></div>
					<Box>
						<h1 className="pb-8  pt-4 pl-3 text-2xl font font-medium">Bills</h1>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
							<div className="flex justify-start items-center p-3">
								<input {...register('b_internet')} className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									Internet
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input {...register('b_water')} className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									Water
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input {...register('b_electricity')} className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									Electricity
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input {...register('b_gas')} className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									Gas
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input {...register('b_taxes')} className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									Property Taxes
								</label>
							</div>
						</div>
					</Box>
					<div className="h-4"></div>
					<Box>
						<h1 className="pb-8  pt-4 pl-3 text-2xl font font-medium">Description</h1>
						<Tab.Group>
							<Tab.List className={`grid grid-cols-2 py-3`}>
								<Tab as={'div'}>{({ selected }) => <div className={`${selected ? 'dark:bg-slate-700 bg-slate-100' : ''} py-3 text-center cursor-pointer transition-colors duration-300`}>PL</div>}</Tab>
								<Tab as={'div'}>{({ selected }) => <div className={`${selected ? 'dark:bg-slate-700 bg-slate-100' : ''} py-3 text-center cursor-pointer transition-colors duration-300`}>EN</div>}</Tab>
							</Tab.List>
							<Tab.Panels>
								<Tab.Panel>
									<textarea className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" {...register('einfo')} cols={30} rows={10}></textarea>
								</Tab.Panel>
								<Tab.Panel>
									<textarea className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" {...register('info')} cols={30} rows={10}></textarea>
								</Tab.Panel>
							</Tab.Panels>
						</Tab.Group>
					</Box>

					<div className="h-4"></div>

					<Box>
						<button type="submit" className="w-full hover:opacity-90  font-semibold cursor-pointer  bg-primary hover:opacity-9 text-zinc-100 px-3 py-2 rounded-sm">
							Edit
						</button>
					</Box>
					<div className="h-4"></div>
				</div>
			</form>
		</>
	);
};

export default Room;
interface PeopleI {
	name: string;
}
const people: PeopleI[] = [{ name: 'tytus' }, { name: 'romek' }, { name: 'atomek' }];
