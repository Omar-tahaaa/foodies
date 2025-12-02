"use server";

import { redirect } from "next/navigation";
import { saveMeal, deleteMeal } from "./meals";
import { revalidatePath } from "next/cache";

export async function shareMeal(formData) {
  const mealData = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  await saveMeal(mealData);
  revalidatePath("/meals");
  redirect("/meals");
}

export async function deleteMealAction(slug) {
  await deleteMeal(slug);
  revalidatePath("/meals");
}
