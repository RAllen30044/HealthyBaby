import * as _ from "lodash-es";
import { writeFileSync } from "fs";
import { faker } from "@faker-js/faker";
import { faK } from "@fortawesome/free-solid-svg-icons";

const range = _.range;
const sample = _.sample;
let personType = faker.person.sexType();
const db = {
  profile: range(1, 5).map((_, id) => ({
    username: `${faker.person.zodiacSign()}${faker.number(range(1, 100))} `,
    password: `${faker.animal()}${faker.number(range(1, 100))}`,
    caregiver: `${faker.person.firstName()}`,
    id,
  })),
  child: range(1, 16).map((_, id) => ({
    gender: personType,
    name: `${
      personType === `female`
        ? faker.person.firstName("female")
        : faker.person.firstName("male")
    }`,
    DOB: `${faker.date.birthdate({ min: 0, max: 6, mode: "age" })}`,
    weight: `${faker.number(range(1, 56))} `,
    height: `${faker.number(range(1, 56))}`,
    headSize: `${faker.number(range(1, 56))}`,
    profileId: range(1, 5),
    id,
  })),
  napHistory: range(1, 100).map((_, id) => ({
    time: `9:00 `,
    date: "February 16, 2024",
    lengthOfTime: `${range(1,181)}`,
    childId: range(1,16),
    id,
  })),
};

// writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });
