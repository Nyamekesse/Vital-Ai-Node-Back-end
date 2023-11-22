import { Request, Response } from "express";

export const getUptimeStatus = async (req: Request, res: Response) => {
  console.log(process.env.NODE_ENV === "production");
  return res.status(200).json({ message: "Server Up and running" });
};
