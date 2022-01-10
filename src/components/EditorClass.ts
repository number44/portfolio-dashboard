interface EditorI {
	setOptions({}): void;
	setContent(content: string, emitUpdate?: boolean): void;
	getHTML(): string;
	destroy(): void;
}

export default EditorI;
