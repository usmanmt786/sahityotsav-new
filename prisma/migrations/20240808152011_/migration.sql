/*
  Warnings:

  - You are about to drop the column `teamId` on the `team_point` table. All the data in the column will be lost.
  - Added the required column `team_id` to the `team_point` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_team_point" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "team_id" INTEGER NOT NULL,
    "point" INTEGER NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_team_point" ("added_at", "id", "point", "updated_at") SELECT "added_at", "id", "point", "updated_at" FROM "team_point";
DROP TABLE "team_point";
ALTER TABLE "new_team_point" RENAME TO "team_point";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
