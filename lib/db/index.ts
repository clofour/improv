import "dotenv/config";
import { drizzle as drizzlePG } from "drizzle-orm/node-postgres";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-serverless";
import ws from "ws";

export const db =
	process.env.NODE_ENV === "development"
		? drizzlePG(process.env.DATABASE_URL!)
		: drizzleNeon({
				connection: process.env.DATABASE_URL!,
				ws: ws,
			});
