import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { fetchCategoriesQuery } from "@/api/queries";
import { PageLayout, Header, PageLoader } from "@/components";
import { VendorForm } from "@/containers";
import { vendorFormSchema } from "@/validation";

import { useCreateNewVendorMutation } from "./hooks";

export const NewVendor = () => {
	const navigate = useNavigate();

	const { data: categories = [], isLoading: isLoadingCategories } = useQuery(
		fetchCategoriesQuery()
	);

	const form = useForm({
		resolver: zodResolver(vendorFormSchema),
	});

	const { createNewVendor, isCreatingNewVendor } = useCreateNewVendorMutation({
		onSuccess: () => {
			form.reset();
			toast.success("Vendor created successfully");
			navigate("/");
		},
		onError: () => {
			toast.error("Failed to create vendor");
		},
	});

	const handleSubmit = async (data: z.infer<typeof vendorFormSchema>) => {
		await createNewVendor(data);
	};

	if (isLoadingCategories) return <PageLoader />;

	return (
		<PageLayout>
			<Header />
			<VendorForm
				isSubmitting={isCreatingNewVendor}
				onSubmit={handleSubmit}
				categories={categories}
			/>
		</PageLayout>
	);
};
