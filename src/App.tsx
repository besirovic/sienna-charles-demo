import { NewVendorDialog, NewCategoryDialog } from "@/containers";

function App() {
	return (
		<div className="flex max-w-6xl m-auto py-20 w-full">
			<div className="flex flex-row items-center justify-between w-full">
				<h1 className="text-2xl font-bold">Sienna Charles</h1>
				<div className="flex flex-row items-center gap-2">
					<NewVendorDialog />
					<NewCategoryDialog />
				</div>
			</div>
		</div>
	);
}

export default App;
