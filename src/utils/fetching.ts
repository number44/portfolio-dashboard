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

export { fetchPosts, fetchNotes, fetchCategories };
