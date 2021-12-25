import { useState } from 'react';
import Box from '../../layouts/Box';
import Editor from './Editor';
import Button from '../../layouts/Button';
import { Link, useNavigate } from 'react-router-dom';
// import Editor from './Mirror';
interface PropsI {}
const CreateNote = ({}: PropsI) => {
	const [value, setValue] = useState('');

	const history = useNavigate();

	return (
		<>
			<Box>
				<div className="flex justify-between items-center">
					<h2 className="font-semibold">Create</h2>
					<Button value="Go back" onClick={() => history(-1)} />
				</div>
			</Box>
			<div className="my-4">
				<Box>
					<div className="h-1 bg-slate-900 my-2 opacity-5"></div>
					<Editor />
					<Button value="Save" />
				</Box>
			</div>
		</>
	);
};

export default CreateNote;
