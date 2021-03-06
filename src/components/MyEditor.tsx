import Box from '../layouts/Box';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough, AiOutlineUnorderedList, AiOutlineCode } from 'react-icons/ai';
import { BiCodeAlt, BiRedo, BiUndo } from 'react-icons/bi';
import { GrBlockQuote } from 'react-icons/gr';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchCategories } from '..//utils/fetching';
import { useMutation, useQuery } from 'react-query';
import queryClient from '../utils/queryClient';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

interface PropsEI {
	editor: any;
}
const MenuBar = ({ editor }: PropsEI) => {
	if (!editor) {
		return null;
	}

	return (
		<div className=" flex justify-between flex-wrap">
			<div onClick={() => editor.chain().focus().toggleBold().run()} className={`${editor.isActive(' bold') ? 'is-active' : ''}`}>
				<AiOutlineBold className="text-md" />
			</div>

			<div onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
				<AiOutlineItalic className="text-md" />
			</div>
			<div onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>
				<AiOutlineStrikethrough />
			</div>
			{/* <div onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'is-active' : ''}>
				<AiOutlineCode />
			</div> */}
			{/* <div onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</div>
			<div onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</div> */}
			<div onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>
				p
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
				h1
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
				h2
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
				h3
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}>
				h4
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}>
				h5
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}>
				h6
			</div>
			<div onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
				<AiOutlineUnorderedList />
			</div>
			{/* <div onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>
				ordered list
			</div> */}
			{/* <div onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
				<BiCodeAlt />
			</div> */}
			<div onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''}>
				<GrBlockQuote />
			</div>
			<div onClick={() => editor.chain().focus().setHorizontalRule().run()}>hr</div>
			<div onClick={() => editor.chain().focus().setHardBreak().run()}>br</div>
			<div onClick={() => editor.chain().focus().undo().run()}>
				<BiUndo />
			</div>
			<div onClick={() => editor.chain().focus().redo().run()}>
				<BiRedo />
			</div>
		</div>
	);
};

interface PropsI {}
const Editor = () => {
	const router = useNavigate();
	const {
		reset,
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<NoteI>();
	const { data, isError, isLoading, error } = useQuery<CategoryI[], Error>('categories', fetchCategories);

	const mutation = useMutation(
		(newNote: NoteI) => {
			return axios.post('/notes', newNote);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('notes');
				router('/notes');
			},
		}
	);

	const onSubmit: SubmitHandler<NoteI> = (data) => {
		const name = data.name;
		const cat = data.category ? parseInt(data.category) : 1;
		const content = editor?.getHTML();
		mutation.mutate({ name: name, content: content, category_id: cat });
		// mutation.isSuccess;
	};
	const editor = useEditor({
		extensions: [StarterKit],
		content: ``,
	});
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box>
					<input autoComplete="off" placeholder="Title" {...register('name', { required: true })} className="w-full dark:bg-zinc-700" type="text" id="" />
					{errors.name && <p className="py-2 text-red-800">Name Required</p>}
				</Box>
				<div className="h-6"></div>
				<Box>
					<div className="grid grid-cols-2 items-center">
						<h1>Category :</h1>
						<div>
							<select className="dark:bg-zinc-700 w-full" {...register('category', { required: true })}>
								{data?.map((cat) => (
									<option className="py-8 appearance-none" key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
							</select>
						</div>
					</div>

					{errors.category && <Alert>Pole wymagane</Alert>}
				</Box>
				<div className="h-6"></div>
				<Box>
					<MenuBar editor={editor} />
					<EditorContent editor={editor} />
					<div className="h-2"></div>
					<button type="submit" className="bg-primary font-semibold cursor-pointer  w-full mt-2 hover:opacity-95 transition-opacity duration-300 text-zinc-100 px-3 py-2 rounded-sm">
						Utw??rz
					</button>
					<div className="h-4"></div>
				</Box>
			</form>
		</div>
	);
};

export default Editor;
