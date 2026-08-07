import { integer, pgTable, uuid } from "drizzle-orm/pg-core";

export const order = pgTable("user", {
	id: uuid("id").defaultRandom().primaryKey(),
	itemId: integer("item_id").notNull(),
	quantity: integer("email").notNull(),
});
