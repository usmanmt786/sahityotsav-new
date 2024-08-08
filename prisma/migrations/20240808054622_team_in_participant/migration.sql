-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "chest_no" TEXT NOT NULL,
    "father_name" TEXT,
    "place" TEXT,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "delete_status" BOOLEAN NOT NULL DEFAULT false,
    "teamId" INTEGER,
    CONSTRAINT "participant_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_participant" ("added_at", "chest_no", "delete_status", "father_name", "id", "name", "place", "updated_at") SELECT "added_at", "chest_no", "delete_status", "father_name", "id", "name", "place", "updated_at" FROM "participant";
DROP TABLE "participant";
ALTER TABLE "new_participant" RENAME TO "participant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
