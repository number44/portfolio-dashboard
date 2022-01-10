import create from 'zustand';

interface Store {
	room_id: string;
	title: string;
	price: string;
	availability: string;
	changeSonData: (a: string, b: string, c: string, d: string) => void;
}
const useStore = create<Store>((set) => ({
	room_id: '',
	title: '',
	price: '',
	availability: '',
	changeSonData: (a, b, c, d) => set({ room_id: a, title: b, price: c, availability: d }),
}));

export default useStore;
