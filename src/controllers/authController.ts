import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { init } from "@paralleldrive/cuid2";

const prisma = new PrismaClient();
const environment = process.env.NODE_ENV || "development";

const secret = process.env.SECRET;
const createId = init({
  length: 10,
  fingerprint: process.env.SECRET,
});
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, userType } = req.body;
    if (!username || !email || !password || !userType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!validator.isStrongPassword(password))
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
      });

    if (
      !validator.isIn(userType, [
        "CARE_RECIPIENT",
        "HEALTH_PROFESSIONAL",
        "ORGANIZATION_ADMIN",
        "ADMIN",
      ])
    )
      return res.status(400).json({ message: "Invalid user type" });

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser)
      return res
        .status(400)
        .json({ message: "Email is associated with another account" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        id: createId(),
        username,
        email,
        password: hashedPassword,
        userType,
      },
    });
    let newUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      userType: user.userType,
    };
    return res
      .status(201)
      .json({ message: "User successfully created", user: newUser })
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email" });

    if (!validator.isLength(password, { min: 8 }))
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      return res.status(400).json({ message: "Email or password invalid" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Email or password invalid" });

    const payload = { id: user.id, userType: user.userType };

    const token = jwt.sign(payload, secret);

    if (environment === "development") {
      res.cookie("vital_ai_token", token, {
        httpOnly: false,
        maxAge: 10800000, // 3 hours
        signed: true,
        sameSite: "lax",
      });
    } else {
      res.cookie("vital_ai_token", token, {
        httpOnly: false,
        maxAge: 10800000, // 3 hours
        signed: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }

    return res.status(200).json({ message: "User authenticated successfully" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("vital_ai_token");
  req.user = null;
  res.sendStatus(200);
};

interface DecodedToken {
  id: string;
  userType: string;
  iat: number;
  [key: string]: any;
}

export const checkAuth = async (req: Request, res: Response) => {
  const cookie = req.signedCookies.vital_ai_token;
  if (!cookie) {
    return res.status(401).json({ isAuthenticated: false });
  }
  try {
    const decodedToken = jwt.verify(cookie, secret!) as DecodedToken;
    decodedToken.id
      ? res.status(200).json({ isAuthenticated: true })
      : res.status(401).json({ isAuthenticated: false });
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};
