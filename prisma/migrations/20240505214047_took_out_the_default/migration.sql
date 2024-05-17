-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_activeHomepageComponent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "page" TEXT NOT NULL
);
INSERT INTO "new_activeHomepageComponent" ("id", "page") SELECT "id", "page" FROM "activeHomepageComponent";
DROP TABLE "activeHomepageComponent";
ALTER TABLE "new_activeHomepageComponent" RENAME TO "activeHomepageComponent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
