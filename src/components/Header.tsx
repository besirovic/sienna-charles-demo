import { Link } from "react-router";

interface Props {
	actions?: React.ReactNode;
}

export const Header = ({ actions }: Props) => {
	return (
		<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
			<Link to="/">
				<h1 className="text-2xl font-bold text-black no-underline">
					Sienna Charles
				</h1>
			</Link>
			{actions}
		</div>
	);
};
