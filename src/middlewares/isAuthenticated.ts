import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";

interface DecodedToken {
  id: string;
  userType: string;
  iat: number;
  [key: string]: any;
}

interface User {
  id: string;
  userType: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
const prisma = new PrismaClient();
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies.token;
  const secret = process.env.SECRET;
  if (!token) return res.sendStatus(401).end();
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
    return res.status(401).json({ message: "Unauthorized" });
  }
};
