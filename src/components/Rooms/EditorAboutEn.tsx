import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorMenu from './EditorMenu';
import useStore from '../../store/about';
import { useEffect, forwardRef, useImperativeHandle } from 'react';
interface PropsI {
	dataprop: string;
}

const example = forwardRef<UploadEditorStateI, PropsI>(({ dataprop }: PropsI, ref) => {
	const aboutPl = useStore((state) => state.aboutPl);
	const aboutEn = useStore((state) => state.aboutEn);
	const changeEn = useStore((state) => state.changeAboutEn);
	useEffect(() => {
		editor?.commands.clearContent();

		editor?.commands.insertContent(dataprop);
	}, [dataprop]);
	useImperativeHandle(ref, () => ({
		uploadEditor: () => {
			const data = editor?.getHTML();
			if (data) {
				changeEn(data);
			}
		},
		clean: () => {
			console.log('dataprop :', dataprop);
		},
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
