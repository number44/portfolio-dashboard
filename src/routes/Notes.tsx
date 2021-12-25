import Box from '../layouts/Box';
import Button from '../layouts/Button';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchNotes } from '../utils/fetching';
import { useState } from 'react';
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
					<div>Notes</div>
					<div>
						<Link to="/note/categories">
							<Button value="Categories" />
						</Link>
						<Link className="mx-2" to="/notes/create">
							<Button value="Create" />
						</Link>
					</div>
				</div>
			</Box>
			<div className=" my-3 grid grid-cols-1  md:grid-cols-2 gap-3 html-text ">
				{data?.map((note) => (
					<Link key={note.id} to={`/note/${note.id}`}>
						<Box>
							<div className="flex justify-between items-center">
								<h1>{note.name}</h1>
								<p className=" font-serif">{note.category}</p>
							</div>
						</Box>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Notes;
