import Box from '../layouts/Box';
import HBox from '../layouts/HBox';

import Button from '../layouts/Button';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchNotes } from '../utils/fetching';
interface PropsI {}
const Notes = ({}: PropsI) => {
	const { data, isError, isLoading, error } = useQuery<NoteI[], Error>('notes', fetchNotes);
	if (isError) {
		return (
			<>
				<Box>Error : {error?.message}</Box>
			</>
		);
	}
	if (isLoading) {
		return (
			<>
				<Box>Loading...</Box>
			</>
		);
	}

	return (
		<div>
			<Box>
				<div className=" uppercase  flex justify-between items-center ">
					<div>Notatki</div>
					<div className="flex items-stretch">
						<Link className="mx-2" to="/notes/create">
							<div className="bg-primary text-slate-100 font-medium py-2 px-3 rounded-sm">Utwórz</div>
						</Link>
					</div>
				</div>
			</Box>
			<div className=" my-3 grid grid-cols-1  md:grid-cols-2 gap-3 html-text ">
				{data &&
					data?.map((note) => (
						<Link key={note.id} to={`/note/${note.id}`}>
							<HBox>
								<div className="flex justify-between items-center">
									<h1>{note.name}</h1>
									<p className=" font-serif">{note.category}</p>
								</div>
							</HBox>
						</Link>
					))}
			</div>
		</div>
	);
};

export default Notes;
