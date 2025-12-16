import { z } from "zod";
import { useForm } from "react-hook-form";

import {
	DialogFooter,
	Button,
	Form,
	FormField,
	FormItem,
	Input,
	Spinner,
} from "@/components";
import { CategorySelector } from "./components";
import type { Category } from "@/types";
import { vendorFormSchema } from "@/validation";

interface Props {
	categories: Category[];
	isSubmitting: boolean;
	onSubmit: (data: z.infer<typeof vendorFormSchema>) => Promise<void>;
}

export const VendorForm = ({ categories, isSubmitting, onSubmit }: Props) => {
	const form = useForm<z.infer<typeof vendorFormSchema>>();

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
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
						disabled={form.formState.isSubmitting || !form.formState.isValid}
					>
						{isSubmitting ? <Spinner /> : "Create"}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
