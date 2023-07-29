import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hospitals } from "../db/organizations";
import { specializations } from "../db/specialization";

const prisma = new PrismaClient();

export const registerHospitals = async (req: Request, res: Response) => {
  try {
    for (const hospital of hospitals) {
      await prisma.organization.create({
        data: {
          name: hospital.name,
          location: hospital.location,
        },
      });
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export const registerSpecialization = async (req: Request, res: Response) => {
  try {
    for (const specialization of specializations) {
      await prisma.specialization.create({
        data: {
          name: specialization.name.toLocaleLowerCase(),
        },
      });
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
