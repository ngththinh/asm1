"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./NewProduct.css";

export default function NewProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "clothing_store");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dtlxoamoi/image/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setForm((prev) => ({ ...prev, image: data.secure_url }));
      alert("Image uploaded successfully!");
    } catch (error) {
      alert("Image upload failed. Please try again.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum)) {
      alert("Price must be a number");
      return;
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: priceNum }),
    });

    if (res.ok) {
      alert("Created successfully");
      router.push("/");
    } else {
      alert("Failed to create product");
    }
  }

  return (
    <main className="form-container">
      <h1 className="form-title">Create New Product</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label className="form-label">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="form-textarea"
          />
        </label>

        <label className="form-label">
          Price
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            type="number"
            step="0.01"
            min="0"
            className="form-input"
          />
        </label>

        <label className="form-label">
          Image URL (auto filled after upload)
          <input
            type="text"
            name="image"
            value={form.image}
            readOnly
            placeholder="Upload an image below"
            className="form-input-readonly"
          />
        </label>

        <label className="form-label">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={uploading}
            className="form-upload"
          />
        </label>

        <button
          type="submit"
          disabled={uploading}
          className={`form-button ${uploading ? "disabled" : ""}`}
        >
          {uploading ? "Uploading Image..." : "Create"}
        </button>
      </form>
    </main>
  );
}
