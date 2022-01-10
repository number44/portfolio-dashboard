import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorMenu from './EditorMenu';
import useStore from '../../store/about';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
interface PropsI {
	dataprop: string;
}
const example = forwardRef<UploadEditorStateI, any>(({ dataprop }, ref) => {
	const aboutPl = useStore((state) => state.aboutPl);
	const changePl = useStore((state) => state.changeAboutPl);
	const [data, setData] = useState('');
	useEffect(() => {
		editor?.commands.clearContent();

		editor?.commands.insertContent(dataprop);
	}, [dataprop]);
	useImperativeHandle(ref, () => ({
		uploadEditor: () => {
			const data = editor?.getHTML();
			if (data) {
				changePl(data);
			}
		},
		clean: () => {},
	}));
	const editor = useEditor({
		extensions: [StarterKit],
		content: dataprop,
	});
	const html = editor?.getHTML();

	return (
		<div className="">
			<EditorMenu editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
});

export default example;
