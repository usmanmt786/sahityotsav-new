-- CreateTable
CREATE TABLE "posters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'result',
    "file_name" TEXT NOT NULL,
    "header_locx" INTEGER NOT NULL,
    "header_locy" INTEGER NOT NULL,
    "body_locx" INTEGER NOT NULL,
    "body_locy" INTEGER NOT NULL,
    "footer_locx" INTEGER NOT NULL,
    "footer_locy" INTEGER NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
