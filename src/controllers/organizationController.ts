import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hospitals } from "../mocks/organizations";
import { specializations } from "../mocks/specialization";
import { init } from "@paralleldrive/cuid2";
import dayjs from "dayjs";

const prisma = new PrismaClient();
const createId = init({
  length: 5,
  fingerprint: process.env.SECRET,
});

export const registerHospitals = async (req: Request, res: Response) => {
  try {
    for (const hospital of hospitals) {
      await prisma.organization.create({
        data: {
          id: createId(),
          name: hospital.name,
          location: hospital.location,
          openTime: hospital.openTime.toISOString(),
          closeTime: hospital.closeTime.toISOString(),
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
          id: createId(),
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
        closeTime: true,
        openTime: true,
      },
    });
    // organizations.forEach((org) => {
    //   console.log(dayjs(org.closeTime).format("HH:mm:A"));
    // });

    res.json({ organizations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch organizations" });
  }
};