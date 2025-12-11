import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Button,
} from "@/components";

export const NewCategoryDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>New category</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New category</DialogTitle>
				</DialogHeader>
				<DialogFooter>
					<Button>Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
