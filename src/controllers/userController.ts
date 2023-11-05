import { CareRecipient, HealthProfessional } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../lib/prisma-instance";

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
  let user: CareRecipient | HealthProfessional;

  try {
    if (req.user) {
      const { id, userType } = req.user;
      if (userType === "CARE_RECIPIENT") {
        user = (await prisma.careRecipient.findUnique({
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
            user: {
              select: {
                userType: true,
              },
            },
          },
        })) as unknown as CareRecipient;
      } else if (userType === "HEALTH_PROFESSIONAL") {
        user = (await prisma.healthProfessional.findUnique({
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
            experience: true,
            about: true,
            medicalLicenseNumber: true,
            organization: {
              select: {
                id: true,
                name: true,
                healthProfessional: {
                  select: {
                    userID: true,
                    firstName: true,
                    displayPicture: true,
                  },
                },
              },
            },
            user: {
              select: {
                userType: true,
              },
            },
          },
        })) as unknown as HealthProfessional;
      }
      return user ? res.status(200).json({ user }) : res.sendStatus(404);
    }
    return res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const { id, userType } = req.user;
  const formData = req.body;
  try {
    if (userType === "CARE_RECIPIENT") {
      const {
        firstName,
        lastName,
        displayPicture,
        gender,
        dateOfBirth,
        contactInfo,
        healthBackground,
        location,
      } = formData;
      await prisma.careRecipient.update({
        where: {
          userID: id,
        },
        data: {
          firstName,
          lastName,
          displayPicture,
          gender,
          dateOfBirth: new Date(dateOfBirth).toISOString(),
          contactInfo,
          healthBackground,
          location,
        },
      });
    } else if (userType === "HEALTH_PROFESSIONAL") {
      const {
        firstName,
        lastName,
        experience,
        medicalLicenseNumber,
        gender,
        contactInfo,
        displayPicture,
        about,
      } = formData;

      await prisma.healthProfessional.update({
        where: {
          userID: id,
        },
        data: {
          firstName,
          lastName,
          displayPicture,
          gender,
          experience: parseInt(experience),
          contactInfo,
          medicalLicenseNumber,
          about,
        },
      });
    }
    res.status(200).json({ message: "User profile updated" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
