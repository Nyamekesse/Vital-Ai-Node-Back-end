/*
  Warnings:

  - Added the required column `experience` to the `HealthProfessional` table without a default value. This is not possible if the table is not empty.
  - Made the column `displayPicture` on table `HealthProfessional` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "HealthProfessional" ADD COLUMN     "experience" INTEGER NOT NULL,
ALTER COLUMN "displayPicture" SET NOT NULL;
