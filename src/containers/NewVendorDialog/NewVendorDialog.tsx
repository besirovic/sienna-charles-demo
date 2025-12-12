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
import { CategorySelector } from "./components";
import type { Category } from "@/types";

import { useCreateNewVendorMutation } from "./hooks";

interface Props {
	categories: Category[];
}

const formSchema = z.object({
	name: z.string().min(3),
	city: z.string().min(3),
	categories: z.array(z.string()).min(1),
});

export const NewVendorDialog = ({ categories }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	const { createNewVendor, isCreatingNewVendor } = useCreateNewVendorMutation({
		onSuccess: () => {
			form.reset();
			toast.success("Vendor created successfully");
			setIsOpen(false);
		},
		onError: () => {
			toast.error("Failed to create vendor");
		},
	});

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		await createNewVendor(data);
	};

	return (
		<Form {...form}>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button>New vendor</Button>
				</DialogTrigger>
				<DialogContent className="flex flex-col gap-6">
					<DialogHeader>
						<DialogTitle>New vendor</DialogTitle>
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
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<Input {...field} type="text" placeholder="City" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="categories"
							render={({ field }) => (
								<FormItem>
									<CategorySelector
										categories={categories}
										onChange={field.onChange}
									/>
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
								{isCreatingNewVendor ? <Spinner /> : "Create"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</Form>
	);
};
