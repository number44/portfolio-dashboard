import './app.scss';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Media from './pages/Media';

import useStore from './store/mode';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
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
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/media" element={<Media />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</HashRouter>
			</div>
		</QueryClientProvider>
	);
};

export default App;
