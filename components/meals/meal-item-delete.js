"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { deleteMealAction } from "@/lib/actions";

export default function MealItemDelete({ slug }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setIsDeleting(true);
      try {
        await deleteMealAction(slug);
        await Swal.fire({
          title: "Deleted!",
          text: "Your meal has been deleted.",
          icon: "success",
          confirmButtonColor: "#28a745",
        });
      } catch (error) {
        setIsDeleting(false);
        await Swal.fire({
          title: "Error!",
          text: "Failed to delete the meal.",
          icon: "error",
          confirmButtonColor: "#dc3545",
        });
      }
    }
  }

  return (
    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
