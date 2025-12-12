export type Category = {
	id: string;
	name: string;
};

export type Vendor = {
	id: string;
	name: string;
	city: string;
	categories: Category[];
};
