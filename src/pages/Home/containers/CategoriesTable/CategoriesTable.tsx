import { Table, TableBody, TableHead, TableRow } from "@/components";
import type { Category } from "@/types";

import { CategoriesTableRow } from "./components";

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
					<CategoriesTableRow key={category.id} category={category} />
				))}
			</TableBody>
		</Table>
	);
};
