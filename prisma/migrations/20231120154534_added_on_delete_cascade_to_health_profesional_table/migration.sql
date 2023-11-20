-- DropForeignKey
ALTER TABLE "HealthProfessional" DROP CONSTRAINT "HealthProfessional_userID_fkey";

-- AddForeignKey
ALTER TABLE "HealthProfessional" ADD CONSTRAINT "HealthProfessional_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
