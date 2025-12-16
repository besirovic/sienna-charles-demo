import { useFormContext } from "react-hook-form";

import {
	DialogFooter,
	Button,
	FormField,
	FormItem,
	Input,
	Spinner,
} from "@/components";
import { CategorySelector } from "./components";
import type { Category } from "@/types";

interface Props {
	categories: Category[];
	isSubmitting: boolean;
	submitText?: string;
	onSubmit: () => void;
}

export const VendorForm = ({
	categories,
	isSubmitting,
	submitText = "Create",
	onSubmit,
}: Props) => {
	const form = useFormContext();

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-6 w-full">
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
							selectedCategories={field.value}
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
					{isSubmitting ? <Spinner /> : submitText}
				</Button>
			</DialogFooter>
		</form>
	);
};
