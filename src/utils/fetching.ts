import axios from 'axios';

async function fetchPosts() {
	const { data } = await axios.get(`/images`);
	return data.data;
}

async function fetchNotes() {
	const { data } = await axios.get(`/notes`);
	return data.data;
}
async function fetchCategories() {
	const { data } = await axios.get(`/categories`);
	return data.data;
}

async function fetchMapCategories() {
	const { data } = await axios.get('/placetypes');
	return data;
}
async function fetchPlaces() {
	const { data } = await axios.get(`/places`);
	return data.data;
}
async function fetchLocations() {
	const { data } = await axios.get(`/locations`);
	return data.data;
}
async function fetchLocation(id: number) {
	const { data } = await axios.get(`/locations/${id}`);
	return data.data;
}
async function fetchRooms() {
	const { data } = await axios.get('/rooms');
	return data.data;
}
async function fetchRoom(id: number) {
	const { data } = await axios.get(`/rooms/${id}`);
	return data.data;
}
async function fetchRoomtypes() {
	const { data } = await axios.get('/roomtypes');
	return data.data;
}
async function searchRooms(query: string) {
	const { data } = await axios.get(`/rooms/search/${query}`);
	return data.data;
}

export { searchRooms, fetchRooms, fetchRoomtypes, fetchPosts, fetchRoom, fetchNotes, fetchCategories, fetchMapCategories, fetchLocations, fetchLocation, fetchPlaces };
