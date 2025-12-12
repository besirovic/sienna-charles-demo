import { supabase } from "../client";
import { QUERY_KEY } from "../query-key";

import type { Category } from "@/types";

export type FetchCategoriesQueryResponse = Category[];

const queryFn = async (): Promise<FetchCategoriesQueryResponse> => {
	const { data } = await supabase.from("categories").select("*");

	return data ?? [];
};

export const fetchCategoriesQuery = () => ({
	queryKey: [QUERY_KEY.GET_CATEGORIES],
	queryFn,
});
