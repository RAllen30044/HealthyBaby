/*
  Warnings:

  - You are about to drop the `EatingHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EatingHistory";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MealHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "time" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "drinkType" TEXT NOT NULL,
    "foodType" TEXT NOT NULL,
    "childId" INTEGER NOT NULL,
    CONSTRAINT "MealHistory_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
