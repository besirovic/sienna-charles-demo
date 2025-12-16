import { useMutation } from "@tanstack/react-query";

import { supabase, queryClient } from "@/api/client";
import { QUERY_KEY } from "@/api/query-key";

interface Input {
	name: string;
	city: string;
	categories: string[];
}

interface Params {
	onSuccess?: () => void;
	onError?: () => void;
}

export const useCreateNewVendorMutation = ({ onSuccess, onError }: Params) => {
	const { mutate, isPending } = useMutation({
		mutationFn: async ({ name, city, categories }: Input) => {
			const { data: vendor, error: vendorError } = await supabase
				.from("vendors")
				.insert({
					name,
					city,
				})
				.select()
				.single();

			if (vendorError || !vendor) {
				console.error(vendorError, vendor);
				throw new Error("Failed to create vendor");
			}

			const vendorCategories = categories.map((category) => ({
				category_id: category,
				vendor_id: vendor.id,
			}));

			await supabase.from("vendor_categories").insert(vendorCategories);
		},
		onError: (error) => {
			console.error(error);
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
		createNewVendor: mutate,
		isCreatingNewVendor: isPending,
	};
};
