import 'remirror/styles/all.css';

import { BoldExtension } from 'remirror/extensions';
import { EditorComponent, Remirror, useRemirror } from '@remirror/react';

const Menu = () => <button onClick={() => alert('TBD')}>B</button>;

const MyEditor = () => {
	const { manager, state } = useRemirror({
		extensions: () => [new BoldExtension()],
		content: '<p>I love <b>Remirror</b></p>',
		selection: 'start',
		stringHandler: 'html',
	});

	return (
		<div className="remirror-theme">
			<Remirror manager={manager} initialContent={state}>
				{/* The text editor is placed above the menu to make the zIndex easier to manage for popups */}
				<EditorComponent />
				<Menu />
			</Remirror>
		</div>
	);
};

export default MyEditor;
