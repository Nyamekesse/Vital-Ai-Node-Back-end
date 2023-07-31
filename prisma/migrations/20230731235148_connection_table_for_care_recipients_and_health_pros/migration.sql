-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "careRecipientID" TEXT NOT NULL,
    "healthProfessionalID" TEXT NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_careRecipientID_fkey" FOREIGN KEY ("careRecipientID") REFERENCES "CareRecipient"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_healthProfessionalID_fkey" FOREIGN KEY ("healthProfessionalID") REFERENCES "HealthProfessional"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
