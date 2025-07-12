/*
  Warnings:

  - A unique constraint covering the columns `[count]` on the table `result` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "result_count_key" ON "result"("count");
