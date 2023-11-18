/*
  Warnings:

  - Made the column `age` on table `CareRecipient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CareRecipient" ALTER COLUMN "age" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileCompleted" BOOLEAN NOT NULL DEFAULT false;
