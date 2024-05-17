/*
  Warnings:

  - You are about to drop the column `profileId` on the `Child` table. All the data in the column will be lost.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Profile` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Child" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gender" TEXT NOT NULL,
    "DOB" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "headSize" TEXT NOT NULL,
    "profileUsername" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Child_profileUsername_fkey" FOREIGN KEY ("profileUsername") REFERENCES "Profile" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Child" ("DOB", "gender", "headSize", "height", "id", "name", "weight") SELECT "DOB", "gender", "headSize", "height", "id", "name", "weight" FROM "Child";
DROP TABLE "Child";
ALTER TABLE "new_Child" RENAME TO "Child";
CREATE TABLE "new_Profile" (
    "username" TEXT NOT NULL PRIMARY KEY DEFAULT '',
    "email" TEXT NOT NULL,
    "caregiver" TEXT,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Profile" ("caregiver", "email", "password", "username") SELECT "caregiver", "email", "password", "username" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
CREATE UNIQUE INDEX "Profile_password_key" ON "Profile"("password");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
