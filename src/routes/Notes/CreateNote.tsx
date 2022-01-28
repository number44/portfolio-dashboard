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
				<div className="flex justify-between items-stretch  ">
					<h2 className=" py-2 font-semibold h-full flex-center ">Utwórz</h2>
					<div className="bg-primary px-4 h-full py-2 text-white uppercase  " onClick={() => history(-1)}>
						Powrót
					</div>
				</div>
			</Box>
			<div className="my-4 max-w-lg mx-auto">
				<div>
					<div className="h-1  bg-slate-900 my-2 opacity-5"></div>
					<MyEditor />
				</div>
			</div>
		</>
	);
};

export default CreateNote;
