import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma-instance";

interface DecodedToken {
  id: string;
  userType: string;
  profileCompleted: boolean;
  iat: number;
  [key: string]: any;
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies.vital_ai_token;
  const secret = process.env.SECRET;
  if (!token) return res.sendStatus(401);
  try {
    const decodedToken = jwt.verify(token, secret!) as DecodedToken;

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
      select: {
        id: true,
        userType: true,
        profileCompleted: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.clearCookie("token");
    return res.status(401).json({ message: "Unauthorized" });
  }
};
