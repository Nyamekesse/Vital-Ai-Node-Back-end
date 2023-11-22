import { Request, Response } from "express";

export const getUptimeStatus = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Server Up and running" });
};
