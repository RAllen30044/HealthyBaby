import { PrismaClient } from "@prisma/client";

import express from "express";
import path from "path";

const client = new PrismaClient();
const app = express();
app.use(express.json());
const publicPath = path.resolve(__dirname, "dist");
app.use(express.static(publicPath));
const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/child", async (_req, res) => {
  const child = await client.child.findMany({
    orderBy: {
      profileId: "asc",
    },
  });
  res.send(child);
});
app.get("/profile", async (_req, res) => {
  const profile = await client.profile.findMany({
    orderBy: {
      id: "asc",
    },
  });
  res.send(profile);
});
app.get("/bottleFeedingHistory", async (_req, res) => {
  const bottleFeedingHistory = await client.bottleFeedingHistory.findMany({
    orderBy: {
      childId: "asc",
    },
  });
  res.send(bottleFeedingHistory);
});
app.get("/breastFeedingHistory", async (_req, res) => {
  const breastFeedingHistory = await client.breastFeedingHistory.findMany({
    orderBy: {
      childId: "asc",
    },
  });
  res.send(breastFeedingHistory);
});
app.get("/mealHistory", async (_req, res) => {
  const eatingHistory = await client.mealHistory.findMany({
    orderBy: {
      childId: "asc",
    },
  });
  res.send(eatingHistory);
});
app.get("/diapersHistory", async (_req, res) => {
  const diapersHistory = await client.diapersHistory.findMany({
    orderBy: {
      childId: "asc",
    },
  });
  res.send(diapersHistory);
});
app.get("/illnessHistory", async (_req, res) => {
  const illnessHistory = await client.illnessHistory.findMany({
    orderBy: {
      childId: "asc",
    },
  });
  res.send(illnessHistory);
});
app.get("/napHistory", async (_req, res) => {
  const napHistory = await client.napHistory.findMany({
    orderBy: {
      childId: "asc",
    },
  });
  res.send(napHistory);
});

app.delete(`/IllnessHistory/:id`, async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(400).send({ message: "id should be a number" });
  }
  const deleteHistory = await Promise.resolve()
    .then(() => {
      return client.illnessHistory.delete({
        where: {
          id,
        },
      });
    })
    .catch(() => null);
  if (deleteHistory === null) {
    return res.status(204).send({ message: `History not found` });
  }
  return res.status(200).send(deleteHistory);
});
app.delete(`/diapersHistory/:id`, async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(400).send({ message: "id should be a number" });
  }
  const deleteHistory = await Promise.resolve()
    .then(() => {
      return client.diapersHistory.delete({
        where: {
          id,
        },
      });
    })
    .catch(() => null);
  if (deleteHistory === null) {
    return res.status(204).send({ message: `History not found` });
  }
  return res.status(200).send(deleteHistory);
});
app.delete(`/napHistory/:id`, async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(400).send({ message: "id should be a number" });
  }
  const deleteHistory = await Promise.resolve()
    .then(() => {
      return client.napHistory.delete({
        where: {
          id,
        },
      });
    })
    .catch(() => null);
  if (deleteHistory === null) {
    return res.status(204).send({ message: `History not found` });
  }
  return res.status(200).send(deleteHistory);
});
app.delete(`/mealHistory/:id`, async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(400).send({ message: "id should be a number" });
  }
  const deleteHistory = await Promise.resolve()
    .then(() => {
      return client.mealHistory.delete({
        where: {
          id,
        },
      });
    })
    .catch(() => null);
  if (deleteHistory === null) {
    return res.status(204).send({ message: `History not found` });
  }
  return res.status(200).send(deleteHistory);
});
app.delete(`/breastFeedingHistory/:id`, async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(400).send({ message: "id should be a number" });
  }
  const deleteHistory = await Promise.resolve()
    .then(() => {
      return client.breastFeedingHistory.delete({
        where: {
          id,
        },
      });
    })
    .catch(() => null);
  if (deleteHistory === null) {
    return res.status(204).send({ message: `History not found` });
  }
  return res.status(200).send(deleteHistory);
});
app.delete(`/bottleFeedingHistory/:id`, async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(400).send({ message: "id should be a number" });
  }
  const deleteHistory = await Promise.resolve()
    .then(() => {
      return client.bottleFeedingHistory.delete({
        where: {
          id,
        },
      });
    })
    .catch(() => null);
  if (deleteHistory === null) {
    return res.status(204).send({ message: `History not found` });
  }
  return res.status(200).send(deleteHistory);
});

app.post("/napHistory", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = ["time", "date", "lengthOfTime", "childId"];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.time !== "string") {
    errors.push("time should be a string");
  }
  if (typeof body.date !== "string") {
    errors.push("date should be a string");
  }
  if (typeof body.lengthOfTime !== "string") {
    errors.push("lengthOfTime should be a string");
  }
  if (typeof body.childId !== "number" || isNaN(body.childId)) {
    errors.push("childId should be a number");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const history = await client.napHistory.create({
      data: {
        time: body.time,
        date: body.date,
        lengthOfTime: body.lengthOfTime,
        childId: body.childId,
      },
    });
    return res.status(201).send(history);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
app.post("/illnessHistory", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = [
    "time",
    "date",
    "symptoms",
    "medicationType",
    "dosage",
    "childId",
  ];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.time !== "string") {
    errors.push("time should be a string");
  }
  if (typeof body.date !== "string") {
    errors.push("date should be a string");
  }
  if (typeof body.symptoms !== "string") {
    errors.push("symptoms should be a string");
  }
  if (typeof body.medicationType !== "string") {
    errors.push("medicationType should be a string");
  }
  if (typeof body.dosage !== "string") {
    errors.push("dosage should be a string");
  }
  if (typeof body.childId !== "number" || isNaN(body.childId)) {
    errors.push("childId should be a number");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const history = await client.illnessHistory.create({
      data: {
        time: body.time,
        date: body.date,
        symptoms: body.symptoms,
        medicationType: body.medicationType,
        dosage: body.dosage,
        childId: body.childId,
      },
    });
    return res.status(201).send(history);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});

app.post("/diapersHistory", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = ["time", "date", "diaperType", "consistency", "childId"];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.time !== "string") {
    errors.push("time should be a string");
  }
  if (typeof body.date !== "string") {
    errors.push("date should be a string");
  }
  if (typeof body.diaperType !== "string") {
    errors.push("diaperType should be a string");
  }
  if (typeof body.consistency !== "string") {
    errors.push("consistency should be a string");
  }
  if (typeof body.childId !== "number" || isNaN(body.childId)) {
    errors.push("childId should be a number");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const history = await client.diapersHistory.create({
      data: {
        time: body.time,
        date: body.date,
        diaperType: body.diaperType,
        consistency: body.consistency,
        childId: body.childId,
      },
    });
    return res.status(201).send(history);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
app.post("/profile", async (req, res) => {
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
        password: body.password,
        caregiver: body.caregiver,
        email: body.email,
      },
    });
    return res.status(201).send(profile);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
app.post("/child", async (req, res) => {
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
  if (typeof body.profileId !== "number" || isNaN(body.profileId)) {
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
        weight: body.Weight,
        headSize: body.headSize,
        profileId: body.profileId,
      },
    });
    return res.status(201).send(child);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
app.post("/mealHistory", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = ["time", "date", "drinkType", "foodType", "childId"];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.time !== "string") {
    errors.push("time should be a string");
  }
  if (typeof body.date !== "string") {
    errors.push("date should be a string");
  }
  if (typeof body.drinkType !== "string") {
    errors.push("drinkType should be a string");
  }
  if (typeof body.medicationType !== "string") {
    errors.push("foodType should be a string");
  }

  if (typeof body.childId !== "number" || isNaN(body.childId)) {
    errors.push("childId should be a number");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const history = await client.mealHistory.create({
      data: {
        time: body.time,
        date: body.date,
        drinkType: body.drinkType,
        foodType: body.foodType,
        childId: body.childId,
      },
    });
    return res.status(201).send(history);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
app.post("/breastFeedingHistory", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = ["time", "date", "feedingTimeLength", "childId"];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.time !== "string") {
    errors.push("time should be a string");
  }
  if (typeof body.date !== "string") {
    errors.push("date should be a string");
  }
  if (typeof body.feedingTimeLength !== "string") {
    errors.push("feedingTimeLength should be a string");
  }

  if (typeof body.childId !== "number" || isNaN(body.childId)) {
    errors.push("childId should be a number");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const history = await client.breastFeedingHistory.create({
      data: {
        time: body.time,
        date: body.date,
        feedingTimeLength: body.feedingTimeLength,
        childId: body.childId,
      },
    });
    return res.status(201).send(history);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
app.post("/bottleFeedingHistory", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = [
    "time",
    "date",
    "bottleQuantity",
    "bottleQuantityLeft",
    "childId",
  ];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.time !== "string") {
    errors.push("time should be a string");
  }
  if (typeof body.date !== "string") {
    errors.push("date should be a string");
  }
  if (typeof body.bottleQuantity !== "string") {
    errors.push("bottleQuantity should be a string");
  }
  if (typeof body.bottleQuantityLeft !== "string") {
    errors.push("bottleQuantityLeft should be a string");
  }

  if (typeof body.childId !== "number" || isNaN(body.childId)) {
    errors.push("childId should be a number");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const history = await client.bottleFeedingHistory.create({
      data: {
        time: body.time,
        date: body.date,
        bottleQuantity: body.bottleQuantity,
        bottleQuantityLeft: body.bottleQuantityLeft,
        childId: body.childId,
      },
    });
    return res.status(201).send(history);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(PORT);
