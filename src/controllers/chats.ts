import { Request, Response } from "express";

export const getAllChats = async (req: Request, res: Response) => {
  const userID = req.user.id;

  res.status(200).json(userID);
};

export const getChatDetailsById = async (req: Request, res: Response) => {
  const userID = req.user.id;
  const { id } = req.params;
  res.status(200).json(userID);
};
