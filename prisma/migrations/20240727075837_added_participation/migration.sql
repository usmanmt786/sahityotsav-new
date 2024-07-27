/*
  Warnings:

  - You are about to drop the column `participant_id` on the `program_participant` table. All the data in the column will be lost.
  - You are about to drop the column `program_id` on the `program_participant` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_program_participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code_letter" TEXT,
    "win_place" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "grade" TEXT,
    "is_attended" BOOLEAN NOT NULL DEFAULT false,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "delete_status" BOOLEAN NOT NULL DEFAULT false,
    "programId" INTEGER,
    "participantId" INTEGER,
    CONSTRAINT "program_participant_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "program_participant_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participant" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_program_participant" ("added_at", "code_letter", "delete_status", "grade", "id", "is_attended", "score", "updated_at", "win_place") SELECT "added_at", "code_letter", "delete_status", "grade", "id", "is_attended", "score", "updated_at", "win_place" FROM "program_participant";
DROP TABLE "program_participant";
ALTER TABLE "new_program_participant" RENAME TO "program_participant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
