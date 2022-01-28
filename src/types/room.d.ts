interface RoomI {
	id: number;
	son_id: number;
	location_id: number;
	roomtype_id: number;
	district_id: number;
	location: string; // no Data
	roomtype: string; // no Data

	name: string;
	ename: string;

	price: number;
	availability: string;
	thumbnail: string;

	internet: boolean;
	tv: boolean;
	washing_machine: boolean;
	dryer: boolean;
	parking: boolean;
	elevator: boolean;
	oven: boolean;
	equipped_kitchen: boolean;

	locales: number;
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
