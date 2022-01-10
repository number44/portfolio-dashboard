import create from 'zustand';

interface Store {
	lat: number;
	lon: number;
	placeChoiceId: number;
	changeCoordinates: (x: number, y: number) => void;
	changePlaceChoiceId: (id: number) => void;
}
const useStore = create<Store>((set) => ({
	lat: 51.759445,
	lon: 19.457216,
	placeChoiceId: 0,
	changeCoordinates: (x, y) => set({ lat: x, lon: y }),
	changePlaceChoiceId: (id) => set({ placeChoiceId: id }),
}));

export default useStore;
