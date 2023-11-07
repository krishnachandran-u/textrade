/*
  Warnings:

  - You are about to drop the column `branchesId` on the `Users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_branchesId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "branchesId";

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
