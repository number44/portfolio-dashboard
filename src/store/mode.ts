import create from 'zustand';

interface Store {
	darkmode: boolean;
	changeMode: () => void;
}
const useStore = create<Store>((set) => ({
	darkmode: true,
	changeMode: () => set((state) => ({ darkmode: !state.darkmode })),
}));

export default useStore;
