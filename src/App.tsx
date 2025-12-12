import { useQuery } from "@tanstack/react-query";

import { fetchCategoriesQuery, fetchVendorsQuery } from "@/api/queries";
import {
	NewVendorDialog,
	NewCategoryDialog,
	VendorsTable,
	CategoriesTable,
} from "@/containers";
import {
	PageLoader,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components";

export const App = () => {
	const { data: categories = [], isLoading: isLoadingCategories } = useQuery(
		fetchCategoriesQuery()
	);

	const { data: vendors = [], isLoading: isLoadingVendors } = useQuery(
		fetchVendorsQuery()
	);

	if (isLoadingCategories || isLoadingVendors) {
		return <PageLoader />;
	}

	return (
		<div className="flex flex-col gap-10 max-w-6xl m-auto py-20 w-full px-4">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
				<h1 className="text-2xl font-bold">Sienna Charles</h1>
				<div className="flex flex-row items-center gap-2">
					<NewVendorDialog categories={categories} />
					<NewCategoryDialog />
				</div>
			</div>
			<Tabs defaultValue="vendors" className="w-full">
				<TabsList className="w-full">
					<TabsTrigger value="vendors" className="w-full">
						Vendors
					</TabsTrigger>
					<TabsTrigger value="categories" className="w-full">
						Categories
					</TabsTrigger>
				</TabsList>
				<TabsContent value="vendors">
					<VendorsTable vendors={vendors} />
				</TabsContent>
				<TabsContent value="categories">
					<CategoriesTable categories={categories} />
				</TabsContent>
			</Tabs>
		</div>
	);
};
