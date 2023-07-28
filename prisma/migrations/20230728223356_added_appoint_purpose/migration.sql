/*
  Warnings:

  - Added the required column `purpose` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "purpose" TEXT NOT NULL;
