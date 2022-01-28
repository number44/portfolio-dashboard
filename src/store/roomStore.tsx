import create from 'zustand';

interface Store {
	fresh: boolean;
	refresh: () => void;
}
const useStore = create<Store>((set) => ({
	fresh: true,
	refresh: () => set((state) => ({ fresh: !state.fresh })),
}));

export default useStore;
