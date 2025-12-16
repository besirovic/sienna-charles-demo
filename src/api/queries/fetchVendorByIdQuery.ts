import { supabase } from "../client";
import { QUERY_KEY } from "../query-key";

import type { Vendor, Category } from "@/types";

export type FetchVendorByIdResponse = Vendor | null;

const queryFn = async (id?: string): Promise<FetchVendorByIdResponse> => {
	if (!id) return null;

	const { data } = await supabase
		.from("vendors")
		.select(
			`
			*,
			vendorCategories: vendor_categories(
	      *,
	      categories: categories(*)
	    )	
		`
		)
		.eq("id", id)
		.single();

	const vendor = {
		id: data?.id ?? "",
		name: data?.name ?? "",
		city: data?.city ?? "",
		categories: (data?.vendorCategories ?? []).map(
			({ categories }) => (categories as Category) ?? []
		),
	};

	return vendor;
};

export const fetchVendorByIdQuery = (id?: string) => ({
	queryKey: [QUERY_KEY.GET_VENDOR_BY_ID, id],
	queryFn: () => (id ? queryFn(id) : null),
});
