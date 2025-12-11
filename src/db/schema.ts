import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const vendors = pgTable("vendors", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	city: text("city").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const vendorRelations = relations(vendors, ({ many }) => ({
	categories: many(vendorCategories),
}));

export const categories = pgTable("categories", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const categoryRelations = relations(categories, ({ many }) => ({
	vendors: many(vendorCategories),
}));

export const vendorCategories = pgTable("vendor_categories", {
	id: uuid("id").primaryKey().defaultRandom(),
	vendorId: uuid("vendor_id").references(() => vendors.id),
	categoryId: uuid("category_id").references(() => categories.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const vendorCategoryRelations = relations(
	vendorCategories,
	({ one }) => ({
		vendor: one(vendors, {
			fields: [vendorCategories.vendorId],
			references: [vendors.id],
		}),
		category: one(categories, {
			fields: [vendorCategories.categoryId],
			references: [categories.id],
		}),
	})
);
