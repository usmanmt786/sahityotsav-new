-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_program" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "time" TEXT,
    "description" TEXT,
    "no_of_participants" INTEGER NOT NULL DEFAULT 1,
    "type" TEXT NOT NULL DEFAULT 'individual',
    "stageType" TEXT NOT NULL DEFAULT 'stage',
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "delete_status" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER NOT NULL,
    "stageId" INTEGER,
    CONSTRAINT "program_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "program_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_program" ("added_at", "categoryId", "delete_status", "description", "id", "name", "no_of_participants", "stageId", "time", "type", "updated_at") SELECT "added_at", "categoryId", "delete_status", "description", "id", "name", "no_of_participants", "stageId", "time", "type", "updated_at" FROM "program";
DROP TABLE "program";
ALTER TABLE "new_program" RENAME TO "program";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
