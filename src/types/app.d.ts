interface NoteI {
	id?: number;
	name: string;
	content?: string;
	slug?: string;
	category?: string;
	category_id?: number;
}
interface CategoryI {
	id?: number;
	name: string;
}

interface PlaceTypesI {
	id?: number;
	name?: string;
	ename?: string;
	icon?: string;
}

interface PlaceI {
	id?: number;
	name?: string;
	ename?: string;
	lat?: number;
	lon?: number;
	placetype?: string;
	placetype_id?: number;
}
