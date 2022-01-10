import create from 'zustand';

interface Store {
	aboutPl: string;
	aboutEn: string;

	changeAboutPl: (a: string) => void;
	changeAboutEn: (a: string) => void;
}
const useStore = create<Store>((set) => ({
	aboutPl: 'Pl from store',
	aboutEn: 'En from Store',

	changeAboutPl: (a) => set({ aboutPl: a }),
	changeAboutEn: (a) => set({ aboutEn: a }),
}));

export default useStore;
