import { Tab } from '@headlessui/react';
import debounce from 'lodash/debounce';
import { useState, useRef, Fragment } from 'react';
import Box from '../../layouts/Box';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../store/sondata';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useMutation, useQueries } from 'react-query';
import queryClient from '../../utils/queryClient';
import axios from 'axios';
import { fetchLocations, fetchRoomtypes } from '../../utils/fetching';
import EditorAboutEn from '../../components/Rooms/EditorAboutEn';
import EditorAboutPl from '../../components/Rooms/EditorAboutPl';

import useAboutStore from '../../store/about';

interface PropsI {}
const RoomCreate = ({}: PropsI) => {
	const [lang, setLang] = useState<string>('pl');
	const routes = useNavigate();
	const [url, setUrl] = useState<string>('./Rectangle.svg');
	const [fileF, setFileF] = useState(null);
	const results = useQueries([
		{ queryKey: ['locations'], queryFn: fetchLocations },
		{ queryKey: ['roomtypes'], queryFn: fetchRoomtypes },
	]);
	const AboutPlRef = useRef<UploadEditorStateI>(null);
	const AboutEnRef = useRef<UploadEditorStateI>(null);
	/**
	 * xxxx
	 */
	const [datapropPl, setDatapropPl] = useState<string>('');
	const [datapropEn, setDatapropEn] = useState<string>('');

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
	}, []);
	useEffect(() => {
		setValue('name', name);
		setValue('ename', name);
		if (price !== '') {
			setValue('price', parseInt(price));
		}
		setValue('availability', availability);
	}, [name]);
	// searching
	useEffect(() => {
		if (searchResult && searchRef.current?.value) {
			AboutPlRef.current?.clean();
			console.log('searchResult :', searchResult.eabout);
			searchRef.current.value = searchResult?.name;
			setDatapropPl(searchResult.about);
			setDatapropEn(searchResult.eabout);
			AboutPlRef.current?.uploadEditor();
			AboutEnRef.current?.uploadEditor();
			setValue('roomtype_id', searchResult.roomtype_id);
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
			console.log('searchResult  rooms:', searchResult.rooms);
			setValue('rooms', searchResult.rooms);
			setValue('beds', searchResult.beds);
			setValue('guests', searchResult.guests);
			setValue('bathrooms', searchResult.bathrooms);
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
		console.log('data :', data);
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
			formData.append('son_id', son_id);
			formData.append('name', newData.name);
			formData.append('ename', newData.ename);
			formData.append('thumbnail', fileF ? fileF : 'thumbnail');
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

			formData.append('rooms', newData.rooms.toString());
			formData.append('beds', newData.beds.toString());
			formData.append('guests', newData.guests.toString());
			formData.append('bathrooms', newData.bathrooms.toString());

			formData.append('about', AboutPl);
			formData.append('eabout', AboutEn);

			formData.append('location_id', newData.location_id.toString());
			formData.append('roomtype_id', newData.roomtype_id.toString());

			formData.append('info', newData.info);
			formData.append('einfo', newData.einfo);

			console.log('AboutPl :', AboutPl);
			console.log('AboutEn :', AboutEn);

			// return new Promise((res, rej) => {});
			return axios.post('/rooms', formData, config);
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
			<Box>
				<Link to="/son">
					<motion.button whileHover={{ scaleY: 0.97 }} className="w-full  font-semibold cursor-pointer  bg-primary hover:opacity-9 text-zinc-100 px-3 py-2 rounded-sm">
						SON
					</motion.button>
				</Link>
			</Box>
			<div className="h-4"></div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="max-w-2xl mx-auto">
					<Box>
						<label htmlFor="name">
							Polish Name
							<input {...register('name', { required: true, minLength: 3 })} autoComplete="off" type="text" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
						</label>
						<label htmlFor="ename">English Name</label>
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
							<input type="file" {...register('thumbnail', { required: true })} onChange={onChangeFile} className="hidden" name="image" />
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
								<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " {...register('internet')} type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									Internet
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " {...register('tv')} type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									tv
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " {...register('washing_machine')} type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									washing machine
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " {...register('dryer')} type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									dryer
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " {...register('parking')} type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									parking
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " {...register('elevator')} type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									elevator
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " {...register('oven')} type="checkbox" />
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
								<input type="number" className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
							<label htmlFor="price">
								Rent for 1 until 2 months
								<input type="number" className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
							<label htmlFor="price">
								Rent for 6 months and more
								<input type="number" className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
						</div>
					</Box>
					<div className="h-4"></div>

					<Box>
						<h1 className="pb-8  pt-4 pl-3 text-2xl font font-medium">Additional Costs</h1>
						<div className="grid grid-cols-1 max-w-md mx-auto sm:grid-cols-1 gap-3 sm:gap-8 px-3 pb-4">
							<label htmlFor="rooms">
								Monthly bills per person
								<input type="number" className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
							<label htmlFor="price">
								Security deposit
								<input type="number" className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
							</label>
						</div>
					</Box>
					<div className="h-4"></div>
					<Box>
						<h1 className="pb-8  pt-4 pl-3 text-2xl font font-medium">Info</h1>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8 px-3 pb-4">
							<label htmlFor="rooms">
								Rooms
								<input {...register('rooms')} type="number" className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
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
								<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									Internet
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									Water
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									Electricity
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
								<label className="uppercase" htmlFor="internet">
									Gas
								</label>
							</div>
							<div className="flex justify-start items-center p-3">
								<input className="focus:ring-3 focus:ring-primary text-primary mr-4 border-primary outline-primary ring-primary " type="checkbox" />
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
							Create
						</button>
					</Box>
					<div className="h-4"></div>
				</div>
			</form>
		</>
	);
};

export default RoomCreate;
interface PeopleI {
	name: string;
}
const people: PeopleI[] = [{ name: 'tytus' }, { name: 'romek' }, { name: 'atomek' }];
