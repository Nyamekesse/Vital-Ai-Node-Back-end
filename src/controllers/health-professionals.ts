import { HealthProfessional, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import validator from "validator";

const prisma = new PrismaClient();

export const fillProfileHealthProfessional = async (
  req: Request,
  res: Response
) => {
  const userId = req.user!.id;
  const userInput: HealthProfessional = req.body;

  try {
    if (!validator.isLength(userInput.firstName, { min: 1, max: 255 })) {
      return res
        .status(400)
        .json({ message: "First name must be between 1 and 255 characters" });
    }

    if (!validator.isLength(userInput.lastName, { min: 1, max: 255 })) {
      return res
        .status(400)
        .json({ message: "Last name must be between 1 and 255 characters" });
    }
    if (!validator.isLength(userInput.specializationId, { min: 1, max: 255 })) {
      return res.status(400).json({ message: "Enter correct specialization" });
    }
    if (
      !validator.isLength(userInput.medicalLicenseNumber, { min: 1, max: 30 })
    ) {
      return res.status(400).json({ message: "Invalid medical License" });
    }
    if (!validator.isUUID(userInput.organizationID)) {
      return res.status(400).json({ message: "Invalid Organization ID" });
    }
    if (!validator.isMobilePhone(userInput.contactInfo)) {
      return res
        .status(400)
        .json({ message: "Contact info must be a valid phone number" });
    }

    const user = await prisma.healthProfessional.create({
      data: {
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        specializationId: userInput.specializationId,
        medicalLicenseNumber: userInput.medicalLicenseNumber,
        contactInfo: userInput.contactInfo,
        userId,
        organizationID: userInput.organizationID,
        profilePicture: `https://api.multiavatar.com/${userId}.svg?apikey=${process.env.MULTI_AVATAR_API_KEY}`,
      },
    });

    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};
