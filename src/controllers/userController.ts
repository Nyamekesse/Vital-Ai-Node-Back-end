import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) return res.status(404).json({ message: "Empty users" });
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const { id, userType } = req.user;
      if (userType === "CARE_RECIPIENT") {
        const user = await prisma.careRecipient.findUnique({
          where: {
            userID: id,
          },
          select: {
            firstName: true,
            lastName: true,
            contactInfo: true,
            location: true,
            healthBackground: true,
            dateOfBirth: true,
            displayPicture: true,
            gender: true,
            Connection: {
              select: {
                healthProfessional: {
                  select: {
                    userID: true,
                    displayPicture: true,
                    firstName: true,
                    lastName: true,
                    specialization: {
                      select: {
                        name: true,
                      },
                    },
                    organization: {
                      select: {
                        name: true,
                      },
                    },
                    createdAt: true,
                  },
                },
              },
            },
          },
        });
        return user ? res.status(200).json({ user }) : res.sendStatus(404);
      } else if (userType === "HEALTH_PROFESSIONAL") {
        const user = await prisma.healthProfessional.findUnique({
          where: {
            userID: id,
          },
          select: {
            firstName: true,
            lastName: true,
            specialization: true,
            gender: true,
            contactInfo: true,
            displayPicture: true,
            Connection: {
              select: {
                careRecipient: {
                  select: {
                    userID: true,
                    displayPicture: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true,
                  },
                },
              },
            },
          },
        });
        return user ? res.status(200).json({ user }) : res.sendStatus(404);
      }
    }
    return res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
