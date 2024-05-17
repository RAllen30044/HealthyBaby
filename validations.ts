import bcrypt from "bcrypt";
import z from "zod";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { PrismaClient, Profile } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      profile?: Profile;
    }
  }
}
const prisma = new PrismaClient();

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("JWT secret key is not defined.");
  }
  return secret;
};

const saltRounds = 11;

export const encryptPassword = (password: string) =>
  bcrypt.hash(password, saltRounds);

export const createUnsecuredInformation = (user: Profile) => ({
  username: user.username,
});

export const generateToken = (user: Profile) =>
  jwt.sign(createUnsecuredInformation(user), getJwtSecret());

const jwtInfoSchema = z.object({
  username: z.string(),
  iat: z.number(),
});

export const getDataFromAuthToken = (token?: string) => {
  if (!token) return null;
  try {
    return jwtInfoSchema.parse(jwt.verify(token, getJwtSecret()));
  } catch (e) {
    console.error(e);
    return null;
  }
};
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Jwt Handler
  const [, token] = req.headers.authorization?.split?.(" ") || [];
  const myJwtData = getDataFromAuthToken(token);

  if (!myJwtData) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const userFromJwt = await prisma.profile.findFirst({
    where: {
      username: myJwtData.username,
    },
  });
  if (!userFromJwt) {
    return res.status(401).json({ message: "User not found" });
  }

  req.profile = userFromJwt;
  next();

  //Jwt Handler End
};
