import { toast } from "sonner";
import { Link } from "react-router";

import { TableRow, TableCell, Button, Spinner } from "@/components";
import type { Category } from "@/types";

import { useDeleteCategoryMutation } from "../hooks";

interface Props {
	category: Category;
}

export const CategoriesTableRow = ({ category }: Props) => {
	const { deleteCategory, isDeletingCategory } = useDeleteCategoryMutation({
		id: category.id,
		onSuccess: () => {
			toast.success("Category deleted successfully");
		},
		onError: () => {
			toast.error("Failed to delete category");
		},
	});

	const handleDelete = () => {
		deleteCategory();
	};

	return (
		<TableRow key={category.id}>
			<TableCell>{category.name}</TableCell>
			<TableCell className="flex flex-row gap-4 justify-end">
				<Link to={`/edit-category/${category.id}`}>
					<Button>Edit</Button>
				</Link>
				<Button
					className="min-w-20"
					onClick={handleDelete}
					disabled={isDeletingCategory}
				>
					{isDeletingCategory ? <Spinner /> : "Delete"}
				</Button>
			</TableCell>
		</TableRow>
	);
};
