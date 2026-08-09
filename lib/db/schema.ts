import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const project = pgTable("project", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	name: text("name").notNull(),
	description: text("description").notNull(),
	codeURL: text("code_url").notNull(),
	demoURL: text("demo_url").notNull(),
	updateDeclaration: text("update_declaration").notNull(),
	aiDeclaration: text("ai_declaration").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const order = pgTable("order", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	itemId: text("item_id").notNull(),
	quantity: integer("quantity").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
