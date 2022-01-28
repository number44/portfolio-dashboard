import create from 'zustand';

interface Store {
	pictureUrl: string;
	isOpen: boolean;
	changePictureUrl: (a: string) => void;
	setIsOpen: (a: boolean) => void;
}
const useStore = create<Store>((set) => ({
	isOpen: false,
	pictureUrl: '',
	changePictureUrl: (a) => set(() => ({ pictureUrl: a })),
	setIsOpen: (a) => set(() => ({ isOpen: a })),
}));

export default useStore;
