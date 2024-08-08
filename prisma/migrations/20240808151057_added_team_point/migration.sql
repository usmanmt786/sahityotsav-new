-- CreateTable
CREATE TABLE "team_point" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "point" INTEGER NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "team_point_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ytvideo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "yt_id" TEXT NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "programId" INTEGER,
    CONSTRAINT "ytvideo_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ytvideo" ("added_at", "id", "title", "yt_id") SELECT "added_at", "id", "title", "yt_id" FROM "ytvideo";
DROP TABLE "ytvideo";
ALTER TABLE "new_ytvideo" RENAME TO "ytvideo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
