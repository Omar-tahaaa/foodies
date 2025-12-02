import fs from "node:fs";
import path from "path";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  const stmt = db.prepare("SELECT * FROM meals");
  const rows = stmt.all();
  return rows;
}

export function getMeal(slug) {
  const stmt = db.prepare("SELECT * FROM meals WHERE slug = ?");
  const row = stmt.get(slug);
  return row;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed to save image");
    }
  });

  meal.image = `/images/${filename}`;

  const stmt = db.prepare(
    "INSERT INTO meals (slug, creator, creator_email, title, summary, instructions, image) VALUES (@slug, @creator, @creator_email, @title, @summary, @instructions, @image)"
  );

  stmt.run(meal);
}

export async function deleteMeal(slug) {
  const meal = getMeal(slug);

  if (!meal) {
    throw new Error("Meal not found");
  }

  // Delete the image file BEFORE deleting from database
  const imagePath = path.join(process.cwd(), "public", meal.image);

  try {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  } catch (error) {
    console.error("Failed to delete image:", error.message);
  }

  // Delete from database after image deletion
  const stmt = db.prepare("DELETE FROM meals WHERE slug = ?");
  stmt.run(slug);
}
