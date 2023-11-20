import { Request, Response } from "express";
import prisma from "../lib/prisma-instance";

export const fetchAllSpecializations = async (req: Request, res: Response) => {
  try {
    const specializations = await prisma.specialization.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return res.json(specializations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch specializations" });
  }
};
