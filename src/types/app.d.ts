interface NoteI {
	id: number;
	name: string;
	content?: string;
	slug?: string;
	category?: string;
}

interface CategoryI {
	id?: number;
	name: string;
}
