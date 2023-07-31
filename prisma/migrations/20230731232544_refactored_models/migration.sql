/*
  Warnings:

  - Made the column `displayPicture` on table `CareRecipient` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `about` to the `HealthProfessional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization.closeTime` to the `HealthProfessional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization.openTime` to the `HealthProfessional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closeTime` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openTime` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Specialization_id_key";

-- AlterTable
ALTER TABLE "CareRecipient" ALTER COLUMN "displayPicture" SET NOT NULL;

-- AlterTable
ALTER TABLE "HealthProfessional" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "organization.closeTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "organization.openTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "closeTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "openTime" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "healthProfessionalID" TEXT NOT NULL,
    "careRecipientID" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_healthProfessionalID_fkey" FOREIGN KEY ("healthProfessionalID") REFERENCES "HealthProfessional"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_careRecipientID_fkey" FOREIGN KEY ("careRecipientID") REFERENCES "CareRecipient"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
