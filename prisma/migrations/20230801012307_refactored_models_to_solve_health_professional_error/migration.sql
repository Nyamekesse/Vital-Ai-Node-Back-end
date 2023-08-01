-- AlterTable
ALTER TABLE "HealthProfessional" ALTER COLUMN "organization.closeTime" DROP NOT NULL,
ALTER COLUMN "organization.openTime" DROP NOT NULL;
