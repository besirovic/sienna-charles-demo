import { useMutation } from "@tanstack/react-query";

import { supabase, queryClient } from "@/api/client";
import { QUERY_KEY } from "@/api/query-key";

interface Input {
	id: string;
	name: string;
	city: string;
	categoriesToAdd: string[];
	categoriesToRemove: string[];
}

interface Params {
	onSuccess?: () => void;
	onError?: () => void;
}

export const useUpdateVendorMutation = ({ onSuccess, onError }: Params) => {
	const { mutate, isPending } = useMutation({
		mutationFn: async ({
			id,
			name,
			city,
			categoriesToAdd,
			categoriesToRemove,
		}: Input) => {
			const { data: vendor, error: vendorError } = await supabase
				.from("vendors")
				.update({
					name,
					city,
				})
				.eq("id", id)
				.select()
				.single();

			if (vendorError || !vendor) {
				throw new Error("Failed to update vendor");
			}

			const vendorCategoriesToAdd = categoriesToAdd.map((category) => ({
				category_id: category,
				vendor_id: vendor.id,
			}));

			const vendorCategoriesToRemove = categoriesToRemove.map((category) => ({
				category_id: category,
				vendor_id: vendor.id,
			}));

			await supabase.from("vendor_categories").insert(vendorCategoriesToAdd);
			await Promise.all(
				vendorCategoriesToRemove.map((category) =>
					supabase
						.from("vendor_categories")
						.delete()
						.eq("category_id", category.category_id)
						.eq("vendor_id", vendor.id)
				)
			);
		},
		onError: () => {
			onError?.();
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.GET_VENDORS],
			});
			onSuccess?.();
		},
	});

	return {
		updateVendor: mutate,
		isUpdatingVendor: isPending,
	};
};
