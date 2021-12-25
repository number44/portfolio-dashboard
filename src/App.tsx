import './app.scss';
import { lazy, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import About from './routes/About';
import Media from './routes/Media';

import useStore from './store/mode';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Login from './routes/Auth/Login';
import Register from './routes/Auth/Register';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Notes from './routes/Notes';
import CreateNote from './routes/Notes/CreateNote';
import Note from './routes/Notes/Note';
import NotFound from './routes/NotFound';

import Layout from './layouts/Layout';
import Auth from './layouts/Auth';
import NoteCategories from './routes/Notes/NoteCategories';
interface PropsI {}

const queryClient = new QueryClient();
const App = ({}: PropsI) => {
	const darkmode = useStore((state) => state.darkmode);
	return (
		<QueryClientProvider client={queryClient}>
			<div className={` ${darkmode ? 'dark' : ''}   `}>
				{/* Change for BrowserRouter if hash is not necessary */}
				<HashRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/notes" element={<Notes />} />
							<Route path="/notes/create" element={<CreateNote />} />
							<Route path="/note/:id" element={<Note />} />
							<Route path="/notes/categories" element={<NoteCategories />} />
							<Route path="/media" element={<Media />} />
							<Route path="*" element={<NotFound />} />
						</Route>
						<Route path="/auth" element={<Auth />}>
							<Route path="/auth/login" element={<Login />} />
							<Route path="/auth/register" element={<Register />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</HashRouter>
			</div>
		</QueryClientProvider>
	);
};

export default App;
