import { useState } from "react";

import {
	Tags,
	TagsContent,
	TagsEmpty,
	TagsGroup,
	TagsInput,
	TagsItem,
	TagsList,
	TagsTrigger,
	TagsValue,
} from "@/components";
import type { Category } from "@/types";

interface Props {
	categories: Category[];
	onChange: (categories: string[]) => void;
}

export const CategorySelector = ({ categories, onChange }: Props) => {
	const [selected, setSelected] = useState<string[]>([]);
	const [, setNewTag] = useState<string>("");

	const handleRemove = (value: string) => {
		if (!selected.includes(value)) {
			return;
		}

		const newSelectedCategories = selected.filter((v) => v !== value);

		setSelected(newSelectedCategories);
		onChange(newSelectedCategories);
	};

	const handleSelect = (value: string) => {
		if (selected.includes(value)) {
			handleRemove(value);
			return;
		}

		const newSelectedCategories = [...selected, value];

		setSelected(newSelectedCategories);
		onChange(newSelectedCategories);
	};

	return (
		<Tags className="w-full">
			<TagsTrigger placeholder="Select categories...">
				{selected.map((category) => (
					<TagsValue key={category} onRemove={() => handleRemove(category)}>
						{categories.find((c) => c.id === category)?.name}
					</TagsValue>
				))}
			</TagsTrigger>
			<TagsContent>
				<TagsInput
					onValueChange={setNewTag}
					placeholder="Search categories..."
				/>
				<TagsList>
					<TagsEmpty />
					<TagsGroup>
						{categories
							.filter((category) => !selected.includes(category.id))
							.map((category) => (
								<TagsItem
									key={category.id}
									onSelect={handleSelect}
									value={category.id}
								>
									{category.name}
								</TagsItem>
							))}
					</TagsGroup>
				</TagsList>
			</TagsContent>
		</Tags>
	);
};
