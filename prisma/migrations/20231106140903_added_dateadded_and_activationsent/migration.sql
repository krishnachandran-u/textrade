/*
  Warnings:

  - Changed the type of `activationSentAt` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "dateAdd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "activationSentAt",
ADD COLUMN     "activationSentAt" TIMESTAMP(3) NOT NULL;
