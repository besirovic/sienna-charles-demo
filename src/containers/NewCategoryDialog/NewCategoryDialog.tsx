import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Button,
	Form,
	FormField,
	FormItem,
	Input,
	Spinner,
} from "@/components";

import { useCreateNewCategoryMutation } from "./hooks";

const formSchema = z.object({
	name: z.string().min(3),
});

export const NewCategoryDialog = () => {
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	const { createNewCategory, isCreatingNewCategory } =
		useCreateNewCategoryMutation({
			onSuccess: () => {
				form.reset();
				toast.success("Category created successfully");
				setIsOpen(false);
			},
			onError: () => {
				toast.error("Failed to create category");
			},
		});

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		await createNewCategory(data);
	};

	return (
		<Form {...form}>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button>New category</Button>
				</DialogTrigger>
				<DialogContent className="flex flex-col gap-6">
					<DialogHeader>
						<DialogTitle>New category</DialogTitle>
					</DialogHeader>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex flex-col gap-6 w-full"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<Input {...field} type="text" placeholder="Name" />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								type="submit"
								className="w-full"
								disabled={
									form.formState.isSubmitting || !form.formState.isValid
								}
							>
								{isCreatingNewCategory ? <Spinner /> : "Create"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</Form>
	);
};
