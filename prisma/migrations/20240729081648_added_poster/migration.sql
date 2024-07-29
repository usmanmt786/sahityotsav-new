-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'result',
    "theme" TEXT NOT NULL DEFAULT 'light',
    "file_name" TEXT NOT NULL,
    "header_locx" INTEGER NOT NULL DEFAULT 0,
    "header_locy" INTEGER NOT NULL DEFAULT 0,
    "body_locx" INTEGER NOT NULL DEFAULT 0,
    "body_locy" INTEGER NOT NULL DEFAULT 0,
    "footer_locx" INTEGER NOT NULL DEFAULT 0,
    "footer_locy" INTEGER NOT NULL DEFAULT 0,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_posters" ("added_at", "body_locx", "body_locy", "file_name", "footer_locx", "footer_locy", "header_locx", "header_locy", "id", "theme", "type", "updated_at") SELECT "added_at", "body_locx", "body_locy", "file_name", "footer_locx", "footer_locy", "header_locx", "header_locy", "id", "theme", "type", "updated_at" FROM "posters";
DROP TABLE "posters";
ALTER TABLE "new_posters" RENAME TO "posters";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
