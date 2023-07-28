import { CareRecipient, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import validator from "validator";
import { parseISO } from "date-fns";


const prisma = new PrismaClient();

export const fillProfilePatient = async (req: Request, res: Response) => {
  const userId = req.user!.id
   const userType = req.user!.userType
   const userInput: CareRecipient = req.body;
  
   try {
    if (!validator.isLength(userInput.firstName, { min: 1, max: 255 })) {
      return res.status(400).json({message:"First name must be between 1 and 255 characters"});
    }

    if (!validator.isLength(userInput.lastName, { min: 1, max: 255 })) {
      return res.status(400).json({message:"Last name must be between 1 and 255 characters"});
    }

    if (!validator.isISO8601(new Date(userInput.dateOfBirth).toISOString())) {
      return res.status(400).json({message:"Date of birth must be in ISO 8601 format (e.g. YYYY-MM-DD)"});
    }

    if (!validator.isMobilePhone(userInput.contactInfo)) {
      return res.status(400).json({message:"Contact info must be a valid phone number"});
    }

    if (!validator.isLength(userInput.gender, { min: 1, max: 255 })) {
      return res.status(400).json({message:"Gender must be between 1 and 255 characters"});
    }

    if (!validator.isLength(userInput.location, { min: 1, max: 255 })) {
      return res.status(400).json({message:"Location must be between 1 and 255 characters"});
    }

    if (!validator.isLength(userInput.healthBio, { min: 1, max: 1000 })) {
      return res.status(400).json({message:"Health bio must be between 1 and 1000 characters"});
    }
    const user = await prisma.careRecipient.create({
      data: {
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        dateOfBirth: parseISO(new Date(userInput.dateOfBirth).toISOString()),
        contactInfo: userInput.contactInfo,
        gender: userInput.gender,
        location: userInput.location,
        healthBio: userInput.healthBio,
        userId:"4a5d0353-8c4a-4ba2-b37c-acacde2b936c",
        profilePicture:'https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png'
      },
    });
    
    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"Failed to create user"})
  }
}