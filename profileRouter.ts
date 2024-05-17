import { Router } from "express";
import { client } from "./prismaClient";
import {
  authMiddleware,
  encryptPassword,
  getDataFromAuthToken,
} from "./validations";

const profileController = Router();

profileController.get("/children", authMiddleware, async (req, res) => {
  const [, token] = req.headers.authorization?.split?.(" ") || [];
  const myJwtData = getDataFromAuthToken(token);

  if (!myJwtData) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const child = await client.child.findMany({
    where: {
      profileUsername: myJwtData.username,
    },
  });
  res.send(child);
});

profileController.get("/firstChild", authMiddleware, async (req, res) => {
  const [, token] = req.headers.authorization?.split?.(" ") || [];
  const myJwtData = getDataFromAuthToken(token);

  if (!myJwtData) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const child = await Promise.resolve()
    .then(() =>
      client.child.findFirst({
        where: {
          profileUsername: myJwtData.username,
        },
      })
    )
    .catch(() => {
      null;
    });
  if (child === null) {
    return res.status(204).send({ message: "First Child not found" });
  }
  return res.status(200).send(child);
});
profileController.get("/profile", authMiddleware, async (req, res) => {
  const [, token] = req.headers.authorization?.split?.(" ") || [];
  const myJwtData = getDataFromAuthToken(token);

  if (!myJwtData) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const profile = await Promise.resolve()
    .then(() =>
      client.profile.findFirst({
        where: {
          username: myJwtData.username,
        },
      })
    )
    .catch(() => {
      null;
    });
  if (profile === null) {
    return res.status(204).send({ message: "Profile not found" });
  }
  return res.status(200).send(profile);
});

profileController.post("/profile", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = ["username", "password", "caregiver", "email"];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.username !== "string") {
    errors.push("username should be a string");
  }
  if (typeof body.password !== "string") {
    errors.push("password should be a string");
  }
  if (typeof body.caregiver !== "string") {
    errors.push("caregiver should be a string");
  }
  if (typeof body.email !== "string") {
    errors.push("email should be a string");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const profile = await client.profile.create({
      data: {
        username: body.username,
        password: await encryptPassword(body.password),
        caregiver: body.caregiver,
        email: body.email,
      },
    });
    return res.status(201).send(profile);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
profileController.post("/child", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = [
    "name",
    "DOB",
    "gender",
    "weight",
    "headSize",
    "height",
    "profileId",
  ];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.name !== "string") {
    errors.push("name should be a string");
  }
  if (typeof body.DOB !== "string") {
    errors.push("DOB should be a string");
  }
  if (typeof body.gender !== "string") {
    errors.push("gender should be a string");
  }
  if (typeof body.weight !== "string") {
    errors.push("weight should be a string");
  }
  if (typeof body.headSize !== "string") {
    errors.push("headSize should be a string");
  }
  if (typeof body.height !== "string") {
    errors.push("height should be a string");
  }
  if (typeof body.profileUsername !== "string") {
    errors.push("profileId should be a number");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const child = await client.child.create({
      data: {
        name: body.name,
        DOB: body.DOB,
        gender: body.gender,
        height: body.height,
        weight: body.weight,
        headSize: body.headSize,
        profileUsername: body.profileUsername,
      },
    });
    return res.status(201).send(child);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
profileController.get("/currentChild/:id", authMiddleware, async (req, res) => {
  const [, token] = req.headers.authorization?.split?.(" ") || [];
  const myJwtData = getDataFromAuthToken(token);

  if (!myJwtData) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const currentChild = await Promise.resolve()
    .then(() =>
      client.child.findFirst({
        where: {
          profileUsername: myJwtData.username,
          id: +req.params.id,
        },
      })
    )
    .catch(() => {
      null;
    });
  if (currentChild === null) {
    return res.status(204).send({ message: "child not found" });
  }
  return res.status(200).send(currentChild);
});
profileController.get("/firstChild/:id", authMiddleware, async (req, res) => {
  const [, token] = req.headers.authorization?.split?.(" ") || [];
  const myJwtData = getDataFromAuthToken(token);

  if (!myJwtData) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const currentChild = await Promise.resolve()
    .then(() =>
      client.child.findFirst({
        where: {
          profileUsername: myJwtData.username,
        },
      })
    )
    .catch(() => {
      null;
    });
  if (currentChild === null) {
    return res.status(204).send({ message: "child not found" });
  }
  return res.status(200).send(currentChild);
});

export { profileController };
