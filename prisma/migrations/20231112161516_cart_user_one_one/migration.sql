/*
  Warnings:

  - You are about to drop the column `userId` on the `Cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usersId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usersId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropIndex
DROP INDEX "Cart_userId_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "userId",
ADD COLUMN     "usersId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_usersId_key" ON "Cart"("usersId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
