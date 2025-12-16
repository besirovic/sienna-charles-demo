import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { fetchCategoriesQuery, fetchVendorByIdQuery } from "@/api/queries";
import { PageLayout, Header, PageLoader, Form, NotFound } from "@/components";
import { VendorForm } from "@/containers";
import { vendorFormSchema } from "@/validation";

import { useUpdateVendorMutation } from "./hooks";

export const EditVendor = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const { data: vendor, isLoading: isLoadingVendor } = useQuery({
		...fetchVendorByIdQuery(id),
		enabled: !!id,
	});

	const { data: categories = [], isLoading: isLoadingCategories } = useQuery(
		fetchCategoriesQuery()
	);

	const form = useForm({
		resolver: zodResolver(vendorFormSchema),
	});

	useEffect(() => {
		if (vendor) {
			form.setValue("name", vendor.name);
			form.setValue("city", vendor.city);
			form.setValue(
				"categories",
				vendor.categories.map((category) => category.id)
			);
		}
	}, [vendor, form]);

	const { updateVendor, isUpdatingVendor } = useUpdateVendorMutation({
		onSuccess: () => {
			form.reset();
			toast.success("Vendor updated successfully");
			navigate("/");
		},
		onError: () => {
			toast.error("Failed to update vendor");
		},
	});

	const handleSubmit = async (data: z.infer<typeof vendorFormSchema>) => {
		if (!id) return;

		const categoriesToAdd = data.categories.filter(
			(category) => !vendor?.categories.some((v) => v.id === category)
		);
		const categoriesToRemove =
			vendor?.categories
				.filter((category) => !data.categories.includes(category.id))
				.map((category) => category.id) ?? [];

		await updateVendor({
			id,
			...data,
			categoriesToAdd,
			categoriesToRemove,
		});
	};

	if (isLoadingCategories || isLoadingVendor) return <PageLoader />;

	if (!vendor) return <NotFound />;

	return (
		<PageLayout>
			<Header />
			<Form {...form}>
				<VendorForm
					isSubmitting={isUpdatingVendor}
					submitText="Update"
					onSubmit={form.handleSubmit(handleSubmit)}
					categories={categories}
				/>
			</Form>
		</PageLayout>
	);
};
