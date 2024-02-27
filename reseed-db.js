import * as _ from "lodash-es";
import { writeFileSync } from "fs";
import { faker } from "@faker-js/faker";

const range = _.range;

const food = [
  "Pizza",
  "Mac and Cheese",
  "Cheeseburger",
  "Fries",
  "PB and J",
  "Turkey Sandwich",
  "Mixed Fruit",
];
const drink = ["Milk", "Water", "Apple juice", "Soda"];
const daiperConsistancy = ["Wet", "Poop"];
const poopType = ["Solid", "Soft", "pebbles"];
const symptoms = ["runny nose", "cough", "nausea", "soft stool", "fever"];
const medicine = ["Tylenol", "NyQuil", "Moltrin"];

const randomizeMedicineOz = () => {
  return `1.${Math.floor(Math.random() * 9)}`;
};
const setRandomTime = () => {
  const randomNumber = Math.floor(Math.random() * 24);

  if (randomNumber < 10) {
    return `0${randomNumber}:${Math.floor(Math.random() * 6)}${Math.floor(
      Math.random() * 10
    )}`;
  }

  return `${randomNumber}:${Math.floor(Math.random() * 6)}${Math.floor(
    Math.random() * 10
  )}`;
};
export function convertToStandardTime(time24hr) {
  const [hours, minutes] = time24hr.split(":");

  const hoursNum = parseInt(hours, 10);

  const period = hoursNum >= 12 ? "PM" : "AM";

  const hours12hr = hoursNum % 12 || 12;

  const standardTime = `${hours12hr}:${minutes} ${period}`;

  return standardTime;
}

const randomizeItem = (itemArray) => {
  return itemArray[Math.floor(Math.random() * itemArray.length)];
};
const randomDOB = () => {
  const getDOB = faker.date.birthdate({ min: 0, max: 6, mode: "age" });
  console.log(getDOB);
  if (getDOB.getMonth() + 1 < 10 && getDOB.getDate() < 10) {
    return `${getDOB.getFullYear()}-0${
      getDOB.getMonth() + 1
    }-0${getDOB.getDate()}`;
  } else if (getDOB.getDate() < 10) {
    return `${getDOB.getFullYear()}-${
      getDOB.getMonth() + 1
    }-0${getDOB.getDate()}`;
  } else if (getDOB.getMonth() < 10) {
    return `${getDOB.getFullYear()}-0${
      getDOB.getMonth() + 1
    }-${getDOB.getDate()}`;
  } else {
    return `${getDOB.getFullYear()}-${
      getDOB.getMonth() + 1
    }-${getDOB.getDate()}`;
  }
};
const createShortHandDate = (date) => {
  const dateParts = date.split("-");
  return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
};

const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

export const randomizeDate = () => {
  const getRandomDate = faker.date.recent({ days: 10 });
  console.log(getRandomDate);
  if (getRandomDate.getMonth() + 1 < 10 && getRandomDate.getDate() < 10) {
    return `${getRandomDate.getFullYear()}-0${
      getRandomDate.getMonth() + 1
    }-0${getRandomDate.getDate()}`;
  } else if (getRandomDate.getDate() < 10) {
    return `${getRandomDate.getFullYear()}-${
      getRandomDate.getMonth() + 1
    }-0${getRandomDate.getDate()}`;
  } else if (getRandomDate.getMonth() < 10) {
    return `${getRandomDate.getFullYear()}-0${
      getRandomDate.getMonth() + 1
    }-${getRandomDate.getDate()}`;
  } else {
    return `${getRandomDate.getFullYear()}-${
      getRandomDate.getMonth() + 1
    }-${getRandomDate.getDate()}`;
  }
};

const db = {
  profile: [
    {
      username: `Andrei.Obushnyi`,
      password: `ILoveBears85`,
      caregiver: `Anna`,
      id: "1",
    },
    {
      username: `Jon.Higger`,
      password: `ILoveDogs87`,
      caregiver: `Mark`,
      id: "2",
    },
    {
      username: `Robharmony`,
      password: `Panthers29`,
      caregiver: `Debbie`,
      id: "3",
    },
    {
      username: `Yalana.Rashton`,
      password: `Saints1`,
      caregiver: `Brittany`,
      id: "4",
    },
  ],
  child: range(1, 16).map((_, id) => {
    let personType = faker.person.sexType();
    return {
      gender: personType,
      name: `${
        personType === `female`
          ? faker.person.firstName("female")
          : faker.person.firstName("male")
      }`,
      DOB: randomDOB(),
      weight: `${Math.floor(Math.random() * 46 + 10)}`,
      height: `${Math.floor(Math.random() * 39 + 17)}`,
      headSize: `${Math.floor(Math.random() * 6 + 17)}`,
      profileId: `${Math.floor(Math.random() * 4 + 1)}`,
      id: `${id + 1}`,
    };
  }),
  napHistory: range(1, 100).map((_, id) => ({
    time: convertToStandardTime(setRandomTime()),
    date: formatDate(createShortHandDate(randomizeDate())),
    lengthOfTime: `${Math.floor(Math.random() * 171 + 10)}`,
    childId: `${Math.floor(Math.random() * 15 + 1)}`,
    id: `${id + 1}`,
  })),
  bottleFeedingHistory: range(1, 100).map((_, id) => ({
    time: convertToStandardTime(setRandomTime()),
    date: formatDate(createShortHandDate(randomizeDate())),
    oz: `${Math.floor(Math.random() * 6 + 4)}`,
    ozLeft: `${Math.floor(Math.random() * 3 + 1)}`,
    childId: `${Math.floor(Math.random() * 15 + 1)}`,
    id: `${id + 1}`,
  })),
  breastFeedingHistory: range(1, 100).map((_, id) => ({
    time: convertToStandardTime(setRandomTime()),
    date: formatDate(createShortHandDate(randomizeDate())),
    feedingTimeLength: `${Math.floor(Math.random() * 31 + 10)}`,
    childId: `${Math.floor(Math.random() * 15 + 1)}`,
    id: `${id + 1}`,
  })),
  infantFeedingHistory: range(1, 100).map((_, id) => ({
    time: convertToStandardTime(setRandomTime()),
    date: formatDate(createShortHandDate(randomizeDate())),
    drinkType: randomizeItem(drink),
    foodType: randomizeItem(food),
    childId: `${Math.floor(Math.random() * 15 + 1)}`,
    id: `${id + 1}`,
  })),
  diapersHistory: range(1, 100).map((_, id) => {
    let daiper = randomizeItem(daiperConsistancy);
    return {
      time: convertToStandardTime(setRandomTime()),
      date: formatDate(createShortHandDate(randomizeDate())),
      type: daiper,
      consistancy:
        daiper.toLowerCase() === "poop" ? randomizeItem(poopType) : "Wet",

      childId: `${Math.floor(Math.random() * 15 + 1)}`,
      id: `${id + 1}`,
    };
  }),
  illness: range(1, 100).map((_, id) => ({
    time: convertToStandardTime(setRandomTime()),
    date: formatDate(createShortHandDate(randomizeDate())),
    symptoms: randomizeItem(symptoms),
    medicineGiven: randomizeItem(medicine),
    oz: randomizeMedicineOz(),
    childId: `${Math.floor(Math.random() * 15 + 1)}`,
    id: `${id + 1}`,
  })),
};

writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });
