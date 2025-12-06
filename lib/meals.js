import { put, del } from "@vercel/blob";
import slugify from "slugify";
import xss from "xss";
import sql from "./db";

export async function getMeals() {
  const meals = await sql`SELECT * FROM meals`;
  return meals;
}

export async function getMeal(slug) {
  const meals = await sql`SELECT * FROM meals WHERE slug = ${slug}`;
  return meals[0];
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // Upload image to Vercel Blob
  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;

  const blob = await put(filename, meal.image, {
    access: "public",
  });

  meal.image = blob.url;

  // Insert into database
  await sql`
    INSERT INTO meals (slug, creator, creator_email, title, summary, instructions, image)
    VALUES (${meal.slug}, ${meal.creator}, ${meal.creator_email}, ${meal.title}, ${meal.summary}, ${meal.instructions}, ${meal.image})
  `;
}

export async function deleteMeal(slug) {
  const meal = await getMeal(slug);

  if (!meal) {
    throw new Error("Meal not found");
  }

  // Delete the image from Blob storage
  try {
    await del(meal.image);
  } catch (error) {
    throw new Error("Failed to delete image: " + error.message);
  }

  // Delete from database
  await sql`DELETE FROM meals WHERE slug = ${slug}`;
}
