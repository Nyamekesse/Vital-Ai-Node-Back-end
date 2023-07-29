import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  userType: string;
  iat: number;
  [key: string]: any;
}

export const isHealthProfessional = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies.vital_ai_token;
  const secret = process.env.SECRET;
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decodedToken = jwt.verify(token, secret!) as DecodedToken;

    if (decodedToken.userType !== "HEALTH_PROFESSIONAL") {
      return res.sendStatus(401);
    }
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.sendStatus(401);
  }
};
