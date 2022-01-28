import create from 'zustand';

interface Store {
	sidebar: string;

	toggleSide: (a: string) => void;
}
const useStore = create<Store>((set) => ({
	sidebar: '',

	toggleSide: (a) => set({ sidebar: a }),
}));

export default useStore;
