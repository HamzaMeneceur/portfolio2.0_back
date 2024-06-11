BEGIN;

-- Insertion dans la table "user"
INSERT INTO "user" ("email", "password", "updated_at")
VALUES ('john@example.com', 'Password123!', now());

-- Insertion dans la table "social_network"
INSERT INTO "social_network" ("label", "link", "user_email", "updated_at")
VALUES ('LinkedIn', 'https://www.linkedin.com/in/john', 'john@example.com', now());

-- Insertion dans la table "project"
INSERT INTO "project" ("name", "link", "type_of_project", "user_email", "updated_at")
VALUES ('Projet A', 'https://github.com/john/proj-a', 'Professionnelle', 'john@example.com', now());

COMMIT;
