interface RoomI {
	id: number;
	son_id: number;
	name: string;
	ename: string;
	price: number;
	availability: string;
	thumbnail: string;

	location_id: number;
	roomtype_id: number;
	location: string;
	roomtype: string;

	internet: boolean;
	tv: boolean;
	washing_machine: boolean;
	dryer: boolean;
	parking: boolean;
	elevator: boolean;
	oven: boolean;
	equipped_kitchen: boolean;

	rooms: number;
	beds: number;
	guests: number;
	bathrooms: number;

	about: string;
	eabout: string;
	info: string;
	einfo: string;

	b_internet: boolean;
	b_water: boolean;
	b_electricity: boolean;
	b_gas: boolean;
	b_taxes: boolean;
	b_costs: number;
	b_deposit: number;

	price_2: number;
	price_3: number;
	price_4: number;
}
