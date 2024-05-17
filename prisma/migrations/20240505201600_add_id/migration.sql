/*
  Warnings:

  - The primary key for the `activeHomepageComponent` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_activeHomepageComponent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "page" TEXT NOT NULL
);
INSERT INTO "new_activeHomepageComponent" ("page") SELECT "page" FROM "activeHomepageComponent";
DROP TABLE "activeHomepageComponent";
ALTER TABLE "new_activeHomepageComponent" RENAME TO "activeHomepageComponent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
