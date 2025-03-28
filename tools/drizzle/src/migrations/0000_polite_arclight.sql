CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"name" text NOT NULL,
	"database" varchar(50) NOT NULL,
	"schema" text NOT NULL,
	"description" text,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"organization_code" varchar(50),
	"organization_name" text,
	"category" varchar(20) DEFAULT 'other' NOT NULL,
	CONSTRAINT "tenants_schema_unique" UNIQUE("schema"),
	CONSTRAINT "tenants_organization_code_unique" UNIQUE("organization_code")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"username" varchar(50) NOT NULL,
	"password" text NOT NULL,
	"display_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"avatar" text,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"last_login_at" timestamp with time zone,
	"last_login_ip" varchar(50),
	"department_id" varchar(36),
	"position" varchar(100),
	"remarks" text,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
