-- CreateTable
CREATE TABLE "team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "delete_status" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ziqx_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "delete_status" BOOLEAN NOT NULL DEFAULT false,
    "teamId" INTEGER,
    CONSTRAINT "user_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("added_at", "delete_status", "id", "name", "role", "updated_at", "ziqx_id") SELECT "added_at", "delete_status", "id", "name", "role", "updated_at", "ziqx_id" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
