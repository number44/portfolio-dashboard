import create from 'zustand';

interface Store {
	formPart: number;
	setFormPart: (a: number) => void;
}
const useStore = create<Store>((set) => ({
	formPart: 0,
	setFormPart: (a) => set({ formPart: a }),
}));

export default useStore;
