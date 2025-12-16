import { useFormContext } from "react-hook-form";

import {
	DialogFooter,
	Button,
	FormField,
	FormItem,
	Input,
	Spinner,
} from "@/components";

interface Props {
	isSubmitting: boolean;
	submitText?: string;
	onSubmit: () => void;
}

export const CategoryForm = ({
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
						<Input
							{...field}
							type="text"
							placeholder="Name"
							value={field.value}
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
