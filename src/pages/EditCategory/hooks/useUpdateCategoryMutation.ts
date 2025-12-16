import { useMutation } from "@tanstack/react-query";

import { supabase, queryClient } from "@/api/client";
import { QUERY_KEY } from "@/api/query-key";

interface Input {
	id: string;
	name: string;
}

interface Params {
	onSuccess?: () => void;
	onError?: () => void;
}

export const useUpdateCategoryMutation = ({ onSuccess, onError }: Params) => {
	const { mutate, isPending } = useMutation({
		mutationFn: async (input: Input) => {
			const { id, name } = input;

			await supabase
				.from("categories")
				.update({
					name,
				})
				.eq("id", id)
				.select();
		},
		onError,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.GET_CATEGORIES, QUERY_KEY.GET_VENDORS],
			});
			onSuccess?.();
		},
	});

	return {
		updateCategory: mutate,
		isUpdatingCategory: isPending,
	};
};
