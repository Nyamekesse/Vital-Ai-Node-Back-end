import { HealthProfessional } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../lib/prisma-instance";
import validator from "validator";

const about =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const fillProfileHealthProfessional = async (
  req: Request,
  res: Response
) => {
  const userID = req.user!.id;
  const userInput: HealthProfessional = req.body;
  if (
    !userInput.contactInfo ||
    !userInput.firstName ||
    !userInput.lastName ||
    !userInput.gender ||
    !userInput.specializationId ||
    !userInput.organizationID ||
    !userInput.medicalLicenseNumber ||
    !userInput.experience
  )
    return res.status(400).json({ message: "All inputs must be filled" });

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
    if (!validator.isMobilePhone(userInput.contactInfo)) {
      return res
        .status(400)
        .json({ message: "Contact info must be a valid phone number" });
    }

    const displayPicture = !userInput.displayPicture
      ? `https://api.multiavatar.com/${userID}.svg?apikey=${process.env.MULTI_AVATAR_API_KEY}`
      : userInput.displayPicture;
    const user = await prisma.healthProfessional.create({
      data: {
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        gender: userInput.gender,
        specializationId: userInput.specializationId,
        medicalLicenseNumber: userInput.medicalLicenseNumber,
        contactInfo: userInput.contactInfo,
        userID,
        organizationID: userInput.organizationID,
        displayPicture,
        about,
        experience: userInput.experience,
      },
    });

    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};

export const fetchAllHealthProfessionals = async (
  req: Request,
  res: Response
) => {
  try {
    const healthProfessionals = await prisma.healthProfessional.findMany({
      select: {
        firstName: true,
        lastName: true,
        specialization: true,
        displayPicture: true,
        organizationID: true,
        userID: true,
        organization: {
          select: {
            name: true,
            closeTime: true,
            openTime: true,
          },
        },
      },
    });
    res.json(healthProfessionals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch health professionals" });
  }
};

export const getDetailsById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const healthProfessional = await prisma.healthProfessional.findUnique({
      where: { userID: id },
      select: {
        firstName: true,
        lastName: true,
        contactInfo: true,
        gender: true,
        displayPicture: true,
        about: true,
        experience: true,
        Connection: true,
        organization: {
          select: {
            name: true,
            closeTime: true,
            openTime: true,
          },
        },
        specialization: {
          select: {
            name: true,
          },
        },
        Review: {
          select: {
            id: true,
            rating: true,
            text: true,
            careRecipient: {
              select: {
                firstName: true,
                lastName: true,
                displayPicture: true,
              },
            },
            healthProfessionalID: true,
          },
        },
      },
    });

    if (!healthProfessional) {
      return res.status(404).json({ message: "Health professional not found" });
    }

    return res.json(healthProfessional);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
