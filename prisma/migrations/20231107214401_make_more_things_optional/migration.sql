/*
  Warnings:

  - You are about to drop the column `passout_year` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_user_name_key";

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "passout_year",
DROP COLUMN "user_name",
ADD COLUMN     "passoutyear" TEXT,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "phoneNo" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "activationKey" DROP NOT NULL,
ALTER COLUMN "note" DROP NOT NULL,
ALTER COLUMN "activationSentAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
