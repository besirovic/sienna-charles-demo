import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { fetchCategoryByIdQuery } from "@/api/queries";
import { PageLayout, Header, PageLoader, NotFound, Form } from "@/components";
import { CategoryForm } from "@/containers";
import { categoryFormSchema } from "@/validation";

import { useUpdateCategoryMutation } from "./hooks";

export const EditCategory = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const { data: category, isLoading: isLoadingCategory } = useQuery({
		...fetchCategoryByIdQuery(id),
		enabled: !!id,
	});

	const form = useForm({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			name: category?.name ?? "",
		},
	});

	useEffect(() => {
		if (category) {
			form.setValue("name", category.name);
		}
	}, [category, form]);

	const { updateCategory, isUpdatingCategory } = useUpdateCategoryMutation({
		onSuccess: () => {
			form.reset();
			toast.success("Category updated successfully");
			navigate("/");
		},
		onError: () => {
			toast.error("Failed to updated category");
		},
	});

	const handleSubmit = async (data: z.infer<typeof categoryFormSchema>) => {
		if (!id) return;

		await updateCategory({ id, name: data.name });
	};

	if (isLoadingCategory) return <PageLoader />;

	if (!category) return <NotFound />;

	return (
		<PageLayout>
			<Header />
			<h2 className="text-md font-bold">Edit Category</h2>
			<Form {...form}>
				<CategoryForm
					submitText="Update"
					isSubmitting={isUpdatingCategory}
					onSubmit={form.handleSubmit(handleSubmit)}
				/>
			</Form>
		</PageLayout>
	);
};
