import z from "zod";

export const categoryFormSchema = z.object({
	name: z.string().min(3),
});

export const vendorFormSchema = z.object({
	name: z.string().min(3),
	city: z.string().min(3),
	categories: z.array(z.string()).min(1),
});
