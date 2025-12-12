import { useQuery } from "@tanstack/react-query";

import { fetchCategoriesQuery } from "@/api/queries";
import { NewVendorDialog, NewCategoryDialog } from "@/containers";
import { PageLoader } from "@/components";

export const App = () => {
	const { data: categories = [], isLoading: isLoadingCategories } = useQuery(
		fetchCategoriesQuery()
	);

	if (isLoadingCategories) {
		return <PageLoader />;
	}

	return (
		<div className="flex max-w-6xl m-auto py-20 w-full px-4">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
				<h1 className="text-2xl font-bold">Sienna Charles</h1>
				<div className="flex flex-row items-center gap-2">
					<NewVendorDialog categories={categories} />
					<NewCategoryDialog />
				</div>
			</div>
		</div>
	);
};
