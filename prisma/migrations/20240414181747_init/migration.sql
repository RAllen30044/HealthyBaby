/*
  Warnings:

  - You are about to drop the column `bottlQuantity` on the `BottleFeedingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `bottlQuantityLeft` on the `BottleFeedingHistory` table. All the data in the column will be lost.
  - Added the required column `bottleQuantity` to the `BottleFeedingHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bottleQuantityLeft` to the `BottleFeedingHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DOB` to the `Child` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BottleFeedingHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "time" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "bottleQuantity" TEXT NOT NULL,
    "bottleQuantityLeft" TEXT NOT NULL,
    "childId" INTEGER NOT NULL,
    CONSTRAINT "BottleFeedingHistory_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BottleFeedingHistory" ("childId", "date", "id", "time") SELECT "childId", "date", "id", "time" FROM "BottleFeedingHistory";
DROP TABLE "BottleFeedingHistory";
ALTER TABLE "new_BottleFeedingHistory" RENAME TO "BottleFeedingHistory";
CREATE TABLE "new_Child" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gender" TEXT NOT NULL,
    "DOB" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "headSize" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    CONSTRAINT "Child_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Child" ("gender", "headSize", "height", "id", "name", "profileId", "weight") SELECT "gender", "headSize", "height", "id", "name", "profileId", "weight" FROM "Child";
DROP TABLE "Child";
ALTER TABLE "new_Child" RENAME TO "Child";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
