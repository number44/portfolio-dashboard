import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough, AiOutlineUnorderedList, AiOutlineCode } from 'react-icons/ai';
import { BiCodeAlt, BiRedo, BiUndo } from 'react-icons/bi';
import { GrBlockQuote } from 'react-icons/gr';

interface PropsEI {
	editor: any;
}

const EditorMenu = ({ editor }: PropsEI) => {
	if (!editor) {
		return null;
	}

	return (
		<div className=" flex justify-between flex-wrap">
			<div onClick={() => editor.chain().focus().toggleBold().run()} className={`${editor.isActive('bold') ? 'text-primary' : ''} xx`}>
				<AiOutlineBold />
			</div>

			<div onClick={() => editor.chain().focus().toggleItalic().run()} className={`${editor.isActive('italic') ? 'text-primary' : ''} cursor-pointer`}>
				<AiOutlineItalic className="text-md" />
			</div>
			<div onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'text-primary' : ''}>
				<AiOutlineStrikethrough />
			</div>
			{/* <div onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'text-primary' : ''}>
				<AiOutlineCode />
			</div> */}
			{/* <div onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</div>
			<div onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</div> */}
			<div onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'text-primary' : ''}>
				p
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'text-primary' : ''}>
				h1
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'text-primary' : ''}>
				h2
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'text-primary' : ''}>
				h3
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editor.isActive('heading', { level: 4 }) ? 'text-primary' : ''}>
				h4
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} className={editor.isActive('heading', { level: 5 }) ? 'text-primary' : ''}>
				h5
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} className={editor.isActive('heading', { level: 6 }) ? 'text-primary' : ''}>
				h6
			</div>
			<div onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'text-primary' : ''}>
				<AiOutlineUnorderedList />
			</div>
			{/* <div onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'text-primary' : ''}>
				ordered list
			</div> */}
			{/* <div onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'text-primary' : ''}>
				<BiCodeAlt />
			</div> */}
			{/* <div onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'text-primary' : ''}>
				<GrBlockQuote />
			</div> */}
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

export default EditorMenu;
