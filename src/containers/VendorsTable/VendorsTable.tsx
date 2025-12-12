import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Button,
} from "@/components";
import type { Vendor } from "@/types";

interface Props {
	vendors: Vendor[];
}

export const VendorsTable = ({ vendors }: Props) => {
	return (
		<Table className="mt-6">
			<TableRow>
				<TableHead>Name</TableHead>
				<TableHead>City</TableHead>
				<TableHead>Categories</TableHead>
				<TableHead className="text-right">Actions</TableHead>
			</TableRow>
			<TableBody>
				{vendors.map((vendor) => (
					<TableRow key={vendor.id}>
						<TableCell>{vendor.name}</TableCell>
						<TableCell>{vendor.city}</TableCell>
						<TableCell>
							{vendor.categories.map((category) => category.name).join(", ")}
						</TableCell>
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
