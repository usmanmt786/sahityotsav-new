/*
  Warnings:

  - You are about to drop the `team_points` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "team_points";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "team_point_v2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "after" INTEGER,
    "isFinal" BOOLEAN NOT NULL DEFAULT false,
    "points" TEXT NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
