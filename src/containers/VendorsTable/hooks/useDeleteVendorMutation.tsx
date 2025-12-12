import { useMutation } from "@tanstack/react-query";

import { supabase, queryClient } from "@/api/client";
import { QUERY_KEY } from "@/api/query-key";

interface Input {
	id: string;
	onSuccess?: () => void;
	onError?: () => void;
}

export const useDeleteVendorMutation = ({ id, onSuccess, onError }: Input) => {
	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			await supabase.from("vendor_categories").delete().eq("vendor_id", id);
			await supabase.from("vendors").delete().eq("id", id);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.GET_VENDORS],
			});

			onSuccess?.();
		},
		onError,
	});

	return {
		deleteVendor: mutate,
		isDeletingVendor: isPending,
	};
};
