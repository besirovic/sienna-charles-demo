import { type PropsWithChildren } from "react";

export const PageLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex flex-col gap-10 max-w-6xl m-auto py-20 w-full px-4">
			{children}
		</div>
	);
};
