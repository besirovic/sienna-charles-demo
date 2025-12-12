import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Button,
} from "@/components";
import type { Category } from "@/types";

interface Props {
	categories: Category[];
}

export const CategoriesTable = ({ categories }: Props) => {
	return (
		<Table className="mt-6">
			<TableRow>
				<TableHead>Name</TableHead>
				<TableHead className="text-right">Actions</TableHead>
			</TableRow>
			<TableBody>
				{categories.map((category) => (
					<TableRow key={category.id}>
						<TableCell>{category.name}</TableCell>
						<TableCell className="flex flex-row gap-4 justify-end">
							<Button>Edit</Button>
							<Button>Delete</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
