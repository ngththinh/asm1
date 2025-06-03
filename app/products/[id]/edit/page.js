"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./EditProduct.css";

export default function EditProduct({ params }) {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setFetchError(null);
      try {
        const id = params.id;
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to load product");
        const data = await res.json();
        setForm({
          name: data.name,
          description: data.description,
          price: data.price.toString(),
          image: data.image || "",
        });
      } catch (error) {
        setFetchError(error.message);
        alert(error.message);
        router.push("/");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id, router]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "clothing_store");
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dtlxoamoi/image/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Image upload failed");

      const data = await res.json();
      setForm((prev) => ({ ...prev, image: data.secure_url }));
      alert("Image uploaded successfully!");
    } catch (error) {
      alert(error.message);
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum)) {
      alert("Price must be a valid number");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: priceNum }),
      });

      if (!res.ok) throw new Error("Failed to update product");

      alert("Updated successfully");
      router.push(`/products/${params.id}`);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading && !form) {
    return <p className="edit-message">Loading product details...</p>;
  }

  if (fetchError) {
    return <p className="edit-message error">Error: {fetchError}</p>;
  }

  if (!form) {
    return null;
  }

  return (
    <main className="edit-form-container">
      <h1 className="edit-title">Edit Product</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <label className="edit-label">
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading || uploadingImage}
            className="edit-input"
          />
        </label>

        <label className="edit-label">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            disabled={loading || uploadingImage}
            className="edit-textarea"
          />
        </label>

        <label className="edit-label">
          Price
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
            disabled={loading || uploadingImage}
            className="edit-input"
          />
        </label>

        <label className="edit-label">
          Image URL (auto-filled after upload)
          <input
            name="image"
            value={form.image}
            readOnly
            className="edit-input-readonly"
            disabled
          />
        </label>

        <label className="edit-label">
          Upload New Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading || uploadingImage}
            className="edit-upload"
          />
        </label>

        <button
          type="submit"
          disabled={loading || uploadingImage}
          className={`edit-button ${loading || uploadingImage ? "disabled" : ""}`}
        >
          {loading || uploadingImage ? "Processing..." : "Update Product"}
        </button>
      </form>
    </main>
  );
}
