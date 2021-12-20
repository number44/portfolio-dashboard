import create from 'zustand';

interface Store {
	darkmode: boolean;
	changeMode: () => void;
}
const useStore = create<Store>((set) => ({
	darkmode: false,
	changeMode: () => set((state) => ({ darkmode: !state.darkmode })),
}));

export default useStore;
