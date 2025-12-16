import { Table, TableBody, TableHead, TableRow } from "@/components";
import type { Vendor } from "@/types";

import { VendorsTableRow } from "./components";

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
					<VendorsTableRow key={vendor.id} vendor={vendor} />
				))}
			</TableBody>
		</Table>
	);
};
