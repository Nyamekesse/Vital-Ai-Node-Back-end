import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  userType: string;
  iat: number;
  [key: string]: any;
}

const prisma = new PrismaClient();
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
        username: true,
        userType: true,
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
