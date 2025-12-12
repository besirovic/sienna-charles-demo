import { useMutation } from "@tanstack/react-query";

import { supabase, queryClient } from "@/api/client";
import { QUERY_KEY } from "@/api/query-key";

interface Input {
	name: string;
}

interface Params {
	onSuccess?: () => void;
	onError?: () => void;
}

export const useCreateNewCategoryMutation = ({
	onSuccess,
	onError,
}: Params) => {
	const { mutate, isPending } = useMutation({
		mutationFn: async (input: Input) => {
			await supabase
				.from("categories")
				.insert({
					...input,
				})
				.select();
		},
		onError,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.GET_CATEGORIES],
			});
			onSuccess?.();
		},
	});

	return {
		createNewCategory: mutate,
		isCreatingNewCategory: isPending,
	};
};
