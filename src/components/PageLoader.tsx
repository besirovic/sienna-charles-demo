import { Spinner } from "./Loader";

export const PageLoader = () => {
	return (
		<div className="flex flex-col w-full h-full h-screen overflow-hidden items-center justify-center">
			<Spinner className="size-12" />
		</div>
	);
};
