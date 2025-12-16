import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import { fetchCategoriesQuery, fetchVendorsQuery } from "@/api/queries";
import { VendorsTable, CategoriesTable } from "@/containers";
import {
	PageLoader,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Button,
	Header,
	PageLayout,
} from "@/components";

export const Home = () => {
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
		<PageLayout>
			<Header
				actions={
					<div className="flex flex-row items-center gap-2">
						<Link to="/new-vendor">
							<Button>New vendor</Button>
						</Link>
						<Link to="/new-category">
							<Button>New category</Button>
						</Link>
					</div>
				}
			/>
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
		</PageLayout>
	);
};
