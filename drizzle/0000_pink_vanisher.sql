CREATE TABLE "agent_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resources" (
	"owner_id" text NOT NULL,
	"id" text NOT NULL,
	"title" text NOT NULL,
	"search_text" text NOT NULL,
	"data" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "resources_owner_id_id_pk" PRIMARY KEY("owner_id","id")
);
--> statement-breakpoint
CREATE TABLE "workspaces" (
	"owner_id" text PRIMARY KEY NOT NULL,
	"threads" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"drafts" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "agent_sessions_owner_idx" ON "agent_sessions" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "resources_owner_idx" ON "resources" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "resources_search_idx" ON "resources" USING gin (to_tsvector('simple', "search_text"));