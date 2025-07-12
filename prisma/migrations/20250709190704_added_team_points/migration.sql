-- CreateTable
CREATE TABLE "team_points" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "after" INTEGER,
    "isFinal" BOOLEAN NOT NULL DEFAULT false,
    "points" TEXT NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
