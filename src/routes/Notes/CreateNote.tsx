import { useState } from 'react';
import Box from '../../layouts/Box';
import MyEditor from '../../components/MyEditor';
import Button from '../../layouts/Button';
import { useNavigate } from 'react-router-dom';
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
				<div>
					<div className="h-1 bg-slate-900 my-2 opacity-5"></div>
					<MyEditor />
				</div>
			</div>
		</>
	);
};

export default CreateNote;
