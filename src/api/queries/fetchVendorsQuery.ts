import { supabase } from "../client";
import { QUERY_KEY } from "../query-key";

import type { Category, Vendor } from "@/types";

export type FetchVendorQueryResponse = Vendor[];

const queryFn = async (): Promise<FetchVendorQueryResponse> => {
	const { data } = await supabase.from("vendors").select(`
    *,
    vendorCategories: vendor_categories(
      *,
      categories: categories(*)
    )
  `);

	const vendors = data?.map(({ vendorCategories, ...vendor }) => ({
		...vendor,
		categories:
			(vendorCategories ?? []).map(
				({ categories }) => (categories as Category) ?? []
			) ?? [],
	}));

	return vendors ?? [];
};

export const fetchVendorsQuery = () => ({
	queryKey: [QUERY_KEY.GET_VENDORS],
	queryFn,
});
