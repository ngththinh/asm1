"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Deleted successfully");
      router.push("/");
    } else {
      alert("Failed to delete");
    }
  }

  return (
    <button onClick={handleDelete} style={{ color: "red" }}>
      Delete
    </button>
  );
}
