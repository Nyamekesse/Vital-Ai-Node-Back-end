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
