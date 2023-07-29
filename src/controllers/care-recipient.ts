import { CareRecipient, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import validator from "validator";
import { parseISO } from "date-fns";

const prisma = new PrismaClient();

export const fillProfilePatient = async (req: Request, res: Response) => {
  const userID = req.user!.id;
  const userInput: CareRecipient = req.body;
  if (
    !userInput.contactInfo ||
    !userInput.dateOfBirth ||
    !userInput.firstName ||
    !userInput.gender ||
    !userInput.location ||
    !userInput.healthBackground ||
    !userInput.lastName
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

    if (!validator.isISO8601(new Date(userInput.dateOfBirth).toISOString())) {
      return res.status(400).json({
        message: "Date of birth must be in ISO 8601 format (e.g. YYYY-MM-DD)",
      });
    }

    if (!validator.isMobilePhone(userInput.contactInfo)) {
      return res
        .status(400)
        .json({ message: "Contact info must be a valid phone number" });
    }

    if (!validator.isLength(userInput.gender, { min: 1, max: 255 })) {
      return res
        .status(400)
        .json({ message: "Gender must be between 1 and 255 characters" });
    }

    if (!validator.isLength(userInput.location, { min: 1, max: 255 })) {
      return res
        .status(400)
        .json({ message: "Location must be between 1 and 255 characters" });
    }

    if (
      !validator.isLength(userInput.healthBackground, { min: 1, max: 1000 })
    ) {
      return res
        .status(400)
        .json({ message: "Health bio must be between 1 and 1000 characters" });
    }
    const displayPicture = !userInput.displayPicture
      ? `https://api.multiavatar.com/${userID}.svg?apikey=${process.env.MULTI_AVATAR_API_KEY}`
      : userInput.displayPicture;
    const user = await prisma.careRecipient.create({
      data: {
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        dateOfBirth: new Date(userInput.dateOfBirth).toISOString(),
        contactInfo: userInput.contactInfo,
        gender: userInput.gender,
        location: userInput.location,
        healthBackground: userInput.healthBackground,
        userID,
        displayPicture,
      },
    });

    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};
