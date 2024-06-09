BEGIN;

DROP TABLE IF EXISTS "project","social_network","user";

DROP TYPE IF EXISTS "top_enum";

CREATE TYPE "top_enum" AS ENUM ('Solo', 'Professionnelle', 'Académique');

CREATE TABLE "user" (
    "email" TEXT PRIMARY KEY,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "social_network" (
    "label" TEXT PRIMARY KEY,
    "link" TEXT NOT NULL,
    "user_email" TEXT NOT NULL REFERENCES "user"("email") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "project" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "project_date" TIMESTAMPTZ DEFAULT now(),
    "type_of_project" top_enum NOT NULL,
    "user_email" TEXT NOT NULL REFERENCES "user"("email") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;