import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import { PageLayout, Header, Form } from "@/components";
import { CategoryForm } from "@/containers";
import { categoryFormSchema } from "@/validation";

import { useCreateNewCategoryMutation } from "./hooks";

export const NewCategory = () => {
	const navigate = useNavigate();

	const form = useForm({
		resolver: zodResolver(categoryFormSchema),
	});

	const { createNewCategory, isCreatingNewCategory } =
		useCreateNewCategoryMutation({
			onSuccess: () => {
				form.reset();
				toast.success("Category created successfully");
				navigate("/");
			},
			onError: () => {
				toast.error("Failed to create category");
			},
		});

	const handleSubmit = async (data: z.infer<typeof categoryFormSchema>) => {
		await createNewCategory(data);
	};

	return (
		<PageLayout>
			<Header />
			<Form {...form}>
				<CategoryForm
					isSubmitting={isCreatingNewCategory}
					onSubmit={form.handleSubmit(handleSubmit)}
				/>
			</Form>
		</PageLayout>
	);
};
