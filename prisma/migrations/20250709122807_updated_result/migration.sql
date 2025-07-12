/*
  Warnings:

  - You are about to drop the column `category` on the `result` table. All the data in the column will be lost.
  - You are about to drop the column `program` on the `result` table. All the data in the column will be lost.
  - Added the required column `programId` to the `result` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "count" INTEGER NOT NULL,
    "winners" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "advertisementId" INTEGER,
    "programId" INTEGER NOT NULL,
    CONSTRAINT "result_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "result_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "advertisement" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_result" ("added_at", "advertisementId", "count", "id", "isPublished", "updated_at", "winners") SELECT "added_at", "advertisementId", "count", "id", "isPublished", "updated_at", "winners" FROM "result";
DROP TABLE "result";
ALTER TABLE "new_result" RENAME TO "result";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
