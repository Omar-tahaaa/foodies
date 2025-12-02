"use client";

import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/actions";
import { useForm, Controller } from "react-hook-form";

export default function ShareMealPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("instructions", data.instructions);
    formData.append("image", data.image[0]);

    await shareMeal(formData);
  };

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className={classes.error}>{errors.name.message}</span>
              )}
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className={classes.error}>{errors.email.message}</span>
              )}
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className={classes.error}>{errors.title.message}</span>
            )}
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              {...register("summary", { required: "Summary is required" })}
            />
            {errors.summary && (
              <span className={classes.error}>{errors.summary.message}</span>
            )}
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              rows="10"
              {...register("instructions", {
                required: "Instructions are required",
              })}
            ></textarea>
            {errors.instructions && (
              <span className={classes.error}>
                {errors.instructions.message}
              </span>
            )}
          </p>
          <Controller
            name="image"
            control={control}
            rules={{ required: "Image is required" }}
            render={({ field: { onChange, value, ...field } }) => (
              <ImagePicker
                label="Your Image"
                name="image"
                onChange={onChange}
                {...field}
              />
            )}
          />
          {errors.image && (
            <span className={classes.error}>{errors.image.message}</span>
          )}
          <p className={classes.actions}>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sharing..." : "Share Meal"}
            </button>
          </p>
        </form>
      </main>
    </>
  );
}
