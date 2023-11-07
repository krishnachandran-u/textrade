/*
  Warnings:

  - You are about to drop the column `userId` on the `Images` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_userId_fkey";

-- DropIndex
DROP INDEX "Images_userId_key";

-- AlterTable
ALTER TABLE "Images" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "profile_pic" TEXT;
