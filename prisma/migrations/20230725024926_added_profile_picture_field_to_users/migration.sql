/*
  Warnings:

  - Added the required column `profilePicture` to the `CareRecipient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `HealthProfessional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CareRecipient" ADD COLUMN     "profilePicture" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HealthProfessional" ADD COLUMN     "profilePicture" TEXT NOT NULL;
