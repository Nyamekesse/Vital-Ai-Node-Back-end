import { CareRecipient, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import validator from "validator";
import { parseISO } from "date-fns";

interface User {
  id: string;
  userType: string;
}
interface UserInput {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  contactInfo: string;
  gender: string;
  location: string;
  healthBio: string;
}
const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const userType = req.user?.userType
    if (userType === "PATIENT") {
      const user = await prisma.careRecipient.findUnique({
        where:{
          userId
        }
      })
      if(!user) return res.sendStatus(404)
      return res.status(200).json(user)
    } else if(userType === "HEALTHPROFESSIONAL"){
      const user = prisma.healthProfessional.findUnique({
        where:{
          userId
        }
      })
      if(!user) return res.sendStatus(404)
      return res.status(200).json(user)
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
}

