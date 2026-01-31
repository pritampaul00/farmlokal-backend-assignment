import dotenv from "dotenv";
dotenv.config();

import { faker } from "@faker-js/faker";
import { db } from "../config/db";

const categories = ["sports", "fitness", "outdoor", "electronics", "fashion"];
const BATCH_SIZE = 5000;
const TOTAL = 1_000_000;

async function seed() {
  console.log("Seeding products...");

  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const values = [];

    for (let j = 0; j < BATCH_SIZE; j++) {
      values.push([
        faker.commerce.productName(),
        faker.commerce.productDescription(),
        faker.helpers.arrayElement(categories),
        faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
        faker.date.past()
      ]);
    }

    await db.query(
      "INSERT INTO products (name, description, category, price, createdAt) VALUES ?",
      [values]
    );

    console.log(`Inserted ${i + BATCH_SIZE}`);
  }

  console.log("Seeding complete");
  process.exit();
}

seed();
