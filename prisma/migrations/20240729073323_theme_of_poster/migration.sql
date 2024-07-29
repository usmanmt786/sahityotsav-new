-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'result',
    "theme" TEXT NOT NULL DEFAULT 'light',
    "file_name" TEXT NOT NULL,
    "header_locx" INTEGER NOT NULL,
    "header_locy" INTEGER NOT NULL,
    "body_locx" INTEGER NOT NULL,
    "body_locy" INTEGER NOT NULL,
    "footer_locx" INTEGER NOT NULL,
    "footer_locy" INTEGER NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_posters" ("added_at", "body_locx", "body_locy", "file_name", "footer_locx", "footer_locy", "header_locx", "header_locy", "id", "type", "updated_at") SELECT "added_at", "body_locx", "body_locy", "file_name", "footer_locx", "footer_locy", "header_locx", "header_locy", "id", "type", "updated_at" FROM "posters";
DROP TABLE "posters";
ALTER TABLE "new_posters" RENAME TO "posters";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
