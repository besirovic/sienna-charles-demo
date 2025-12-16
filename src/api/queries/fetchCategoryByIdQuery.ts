import { supabase } from "../client";
import { QUERY_KEY } from "../query-key";

import type { Category } from "@/types";

export type FetchCategoryByIdResponse = Category | null;

const queryFn = async (id?: string): Promise<FetchCategoryByIdResponse> => {
	if (!id) return null;

	const { data } = await supabase
		.from("categories")
		.select("*")
		.eq("id", id)
		.single();

	return data;
};

export const fetchCategoryByIdQuery = (id?: string) => ({
	queryKey: [QUERY_KEY.GET_CATEGORY_BY_ID, id],
	queryFn: () => queryFn(id),
});
