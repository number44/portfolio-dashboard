import './app.scss';
import Home from './routes/Home';
import About from './routes/About';
import Media from './routes/Media/Media';
import CreateMedia from './routes/Media/CreateMedia';
import Olx from './routes/Tasks/Olx';
import useStore from './store/mode';
import { Routes, Route, HashRouter, useNavigate } from 'react-router-dom';
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
import Places from './routes/Places';
import PlaceTypes from './routes/Map/PlaceTypes';
import CreatePlace from './routes/CreatePlace';
import Rooms from './routes/Rooms';
import Locations from './routes/Rooms/Locations';
import Location from './routes/Rooms/Location';
import RoomCreate from './routes/Rooms/CreateRoom';
import Room from './routes/Rooms/Room';
import CreateLocation from './routes/Rooms/CreateLocation';
import Son from './routes/Son';
import Roomtypes from './routes/Roomtypes/Roomtypes';
import Roomtype from './routes/Roomtypes/Roomtype';
import RoomtypeCreate from './routes/Roomtypes/RoomtypeCreate';
import District from './routes/Districts/District';
import Districts from './routes/Districts/Districts';
import DistrictCreate from './routes/Districts/DistrictCreate';
import Gallery from './routes/Rooms/Gallery';
import Drop from './routes/Rooms/Drop';
interface PropsI {}

const queryClient = new QueryClient();
import Reservations from './routes/Reservations';
import CreateReservation from './routes/Reservation/CreateReservation';
import Policy from './routes/Policy';
import Facebook from './routes/Facebook/Facebook';
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
							<Route path="/media/add" element={<CreateMedia />} />

							<Route path="/map" element={<Places />} />
							<Route path="/map/categories" element={<PlaceTypes />} />
							<Route path="/map/create" element={<CreatePlace />} />
							<Route path="/rooms" element={<Rooms />} />

							<Route path="/locations" element={<Locations />} />
							<Route path="/locations/create" element={<CreateLocation />} />
							<Route path="/rooms/create" element={<RoomCreate />} />
							<Route path="/rooms/:id" element={<Room />} />
							<Route path="/rooms/gallery/:id" element={<Gallery />} />

							<Route path="/roomtypes/" element={<Roomtypes />} />
							<Route path="/roomtypes/:id" element={<Roomtype />} />
							<Route path="/rooms/gallery/add/:id" element={<Drop />} />

							<Route path="/roomtype/create" element={<RoomtypeCreate />} />

							<Route path="districts/" element={<Districts />} />
							<Route path="districts/:id" element={<District />} />
							<Route path="district/create" element={<DistrictCreate />} />

							<Route path="/locations/:id" element={<Location />} />
							<Route path="/son" element={<Son />} />
							<Route path="/olx" element={<Olx />} />
							<Route path="/facebook" element={<Facebook />} />

							<Route path="/reservations" element={<Reservations />} />
							<Route path="/reservations/create" element={<CreateReservation />} />
							<Route path="/policy" element={<Policy />} />

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
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
