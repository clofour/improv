ALTER TABLE "project" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "code_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "demo_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "update_declaration" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "ai_declaration" DROP NOT NULL;