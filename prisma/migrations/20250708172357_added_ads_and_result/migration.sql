-- CreateTable
CREATE TABLE "result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "count" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "winners" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "advertisementId" INTEGER,
    CONSTRAINT "result_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "advertisement" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "advertisement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "subscription" INTEGER NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
