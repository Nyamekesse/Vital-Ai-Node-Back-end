import { init } from "@paralleldrive/cuid2";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const createId = init({
  length: 5,
  fingerprint: process.env.SECRET,
});

export const addReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, rating } = req.body;
  const careRecipientID = req.user.id;
  if (!id || !text || !rating || !careRecipientID) return res.sendStatus(400);
  try {
    const review = await prisma.review.create({
      data: {
        id: createId(),
        text,
        rating,
        healthProfessionalID: id,
        careRecipientID,
      },
    });

    return res.status(201).json(review);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
