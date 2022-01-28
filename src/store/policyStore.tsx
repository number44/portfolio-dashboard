import create from 'zustand';

interface Store {
	editPolicy: boolean;
	policyPl: string;
	policyEn: string;

	changePolicyPl: (a: string) => void;
	changePolicyEn: (a: string) => void;
	changePolicy: () => void;
}
const useStore = create<Store>((set) => ({
	policyPl: 'Pl from store',
	policyEn: 'En from Store',
	editPolicy: false,
	changePolicyPl: (a) => set({ policyPl: a }),
	changePolicyEn: (a) => set({ policyEn: a }),
	changePolicy: () => set((state) => ({ editPolicy: !state.editPolicy })),
}));

export default useStore;
