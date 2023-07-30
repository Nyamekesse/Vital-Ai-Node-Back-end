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

export const getAllOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await prisma.organization.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.json({ organizations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch organizations" });
  }
};
