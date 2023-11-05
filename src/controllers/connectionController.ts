import { init } from "@paralleldrive/cuid2";
import { UserType } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../lib/prisma-instance";

const createId = init({
  length: 5,
  fingerprint: process.env.SECRET,
});

export const addConnection = async (req: Request, res: Response) => {
  const { id } = req.params;
  const careRecipientID = req.user.id;
  try {
    const existingConnection = await prisma.connection.findFirst({
      where: {
        careRecipientID,
        healthProfessionalID: id,
      },
    });
    if (existingConnection)
      return res.status(400).json({ message: "Already added to favorites" });
    const newConnection = await prisma.connection.create({
      data: {
        id: createId(),
        careRecipientID,
        healthProfessionalID: id,
      },
    });
    return res.status(201).json(newConnection);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const removeConnection = async (req: Request, res: Response) => {
  const { id } = req.params;
  const careRecipientID = req.user.id;
  try {
    const connectionToRemove = await prisma.connection.findFirst({
      where: {
        careRecipientID,
        healthProfessionalID: id,
      },
    });
    if (!connectionToRemove)
      return res.status(400).json({ message: "Favorite does not exist" });
    await prisma.connection.delete({
      where: {
        id: connectionToRemove.id,
      },
    });
    return res.status(200).json({ connectionToRemove });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getAllConnections = async (req: Request, res: Response) => {
  const userID = req.user.id;
  const userType = req.user.userType;
  let connectionList = [];
  try {
    if (userType === UserType.CARE_RECIPIENT) {
      connectionList = await prisma.connection.findMany({
        where: {
          careRecipientID: userID,
        },
        select: {
          id: true,
          healthProfessional: {
            select: {
              userID: true,
              firstName: true,
              lastName: true,
              displayPicture: true,
              organization: {
                select: {
                  name: true,
                },
              },
              specialization: {
                select: {
                  name: true,
                },
              },
            },
          },
          createdAt: true,
        },
      });
    } else if (userType === UserType.HEALTH_PROFESSIONAL) {
      connectionList = await prisma.connection.findMany({
        where: {
          healthProfessionalID: userID,
        },
        select: {
          id: true,
          careRecipient: true,
          createdAt: true,
        },
      });
    }
    return res.status(200).json(connectionList);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
