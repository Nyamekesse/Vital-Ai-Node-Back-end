import { CareRecipient, HealthProfessional, User } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../lib/prisma-instance";
import { v2 as cloudinary } from "cloudinary";
import { Fields, Files, IncomingForm } from "formidable";
import jwt from "jsonwebtoken";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  signature_algorithm: "sha256",
});
const secret = process.env.SECRET;
const isFileValid = (mimetype: string) => {
  const validTypes = ["jpg", "jpeg", "png"];
  if (validTypes.indexOf(mimetype) === -1) {
    return false;
  }
  return true;
};

export const uploadImage = async (req: Request, res: Response) => {
  const form = new IncomingForm({
    allowEmptyFiles: false,
    maxFileSize: 5 * 1024 * 1024,
  });

  form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
    if (err) {
      console.log(err.message);
      return res.status(400).json({
        message: "There was an error parsing the file",
      });
    }
    try {
      const localFilePath = files.profileImage[0].filepath;
      const mimeType = files.profileImage[0].mimetype.split("/")[1].trim();
      const isValid = isFileValid(mimeType);
      if (isValid) {
        const result = await cloudinary.uploader.upload(localFilePath);
        return res.status(200).json({
          message: "Image uploaded successfully",
          imageUrl: result.url,
        });
      } else {
        return res.sendStatus(422);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
};

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
            age: true,
            healthBackground: true,
            dateOfBirth: true,
            displayPicture: true,
            gender: true,
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
        age,
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
          age: Number(age),
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

export const registerUserProfile = async (req: Request, res: Response) => {
  const { id, userType } = req.user;
  const formData: CareRecipient | HealthProfessional = req.body;

  const displayPicture = !formData.displayPicture
    ? `https://api.multiavatar.com/${id}.svg?apikey=${process.env.MULTI_AVATAR_API_KEY}`
    : formData.displayPicture;
  let user: User;
  try {
    if (userType === "CARE_RECIPIENT") {
      const {
        firstName,
        lastName,
        gender,
        age,
        dateOfBirth,
        contactInfo,
        healthBackground,
        location,
      } = formData as CareRecipient;
      await prisma.careRecipient.create({
        data: {
          userID: id,
          firstName,
          lastName,
          displayPicture,
          age: Number(age),
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
        specializationId,
        gender,
        medicalLicenseNumber,
        contactInfo,
        organizationID,
        experience,
        about,
      } = formData as HealthProfessional;

      await prisma.healthProfessional.create({
        data: {
          firstName,
          lastName,
          gender,
          medicalLicenseNumber,
          contactInfo,
          experience: Number(experience),
          displayPicture,
          about,
          specialization: {
            connect: {
              id: specializationId,
            },
          },
          user: {
            connect: {
              id,
            },
          },
          organization: {
            connect: {
              id: organizationID,
            },
          },
        },
      });
    }

    user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        profileCompleted: true,
      },
    });
    const payload = {
      id: user.id,
      userType: user.userType,
      profileCompleted: user.profileCompleted,
    };

    const token = jwt.sign(payload, secret);

    res.cookie("vital_ai_token", token, {
      httpOnly: process.env.NODE_ENV === "production" ? true : false,
      signed: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res
      .status(200)
      .json({ message: "User profile created successfully", token });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
