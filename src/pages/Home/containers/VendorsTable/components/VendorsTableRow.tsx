import { toast } from "sonner";
import { Link } from "react-router";

import { TableCell, TableRow, Button, Spinner } from "@/components";
import type { Vendor } from "@/types";

import { useDeleteVendorMutation } from "../hooks";

interface Props {
	vendor: Vendor;
}

export const VendorsTableRow = ({ vendor }: Props) => {
	const { deleteVendor, isDeletingVendor } = useDeleteVendorMutation({
		id: vendor.id,
		onSuccess: () => {
			toast.success("Vendor deleted successfully");
		},
		onError: () => {
			toast.error("Failed to delete vendor");
		},
	});

	const handleDelete = () => {
		deleteVendor();
	};

	return (
		<TableRow>
			<TableCell>{vendor.name}</TableCell>
			<TableCell>{vendor.city}</TableCell>
			<TableCell>
				{vendor.categories.map((category) => category.name).join(", ")}
			</TableCell>
			<TableCell className="flex flex-row gap-4 justify-end">
				<Link to={`/edit-vendor/${vendor.id}`}>
					<Button>Edit</Button>
				</Link>
				<Button
					className="min-w-20"
					onClick={handleDelete}
					disabled={isDeletingVendor}
				>
					{isDeletingVendor ? <Spinner /> : "Delete"}
				</Button>
			</TableCell>
		</TableRow>
	);
};
