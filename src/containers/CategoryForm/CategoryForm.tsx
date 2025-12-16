import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import {
	DialogFooter,
	Button,
	Form,
	FormField,
	FormItem,
	Input,
	Spinner,
} from "@/components";
import { categoryFormSchema } from "@/validation";

interface Props {
	isSubmitting: boolean;
	onSubmit: SubmitHandler<z.infer<typeof categoryFormSchema>>;
}

export const CategoryForm = ({ isSubmitting, onSubmit }: Props) => {
	const form = useForm<z.infer<typeof categoryFormSchema>>();

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
