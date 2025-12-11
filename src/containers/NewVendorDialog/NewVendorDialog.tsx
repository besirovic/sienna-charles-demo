import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Button,
} from "@/components";

export const NewVendorDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>New vendor</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New vendor</DialogTitle>
				</DialogHeader>
				<DialogFooter>
					<Button>Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
