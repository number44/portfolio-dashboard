import create from 'zustand';

interface Store {
	name: string;
	email: string;
	setName: (a: string) => void;
	setEmail: (a: string) => void;
}
const useStore = create<Store>((set) => ({
	name: '',
	email: '',

	setName: (a) => set({ name: a }),
	setEmail: (a) => set({ email: a }),
}));

export default useStore;
