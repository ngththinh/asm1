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
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dtlxoamoi/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
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
      alert("Failed to create tech product");
    }
  }

  return (
    <div className="form-wrapper">
      <div className="container">
        <div className="form-container">
          <div className="form-header">
            <div className="form-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="12"
                  y1="8"
                  x2="12"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="8"
                  y1="12"
                  x2="16"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h1 className="form-title">Add New Tech Product</h1>
            <p className="form-subtitle">
              Create a new tech product for your store
            </p>
          </div>

          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <svg
                    className="label-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Product Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter tech product name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <svg
                    className="label-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 1v6m0 6v6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Price (VND)
                </label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <svg
                  className="label-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polyline
                    points="14,2 14,8 20,8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="16"
                    y1="13"
                    x2="8"
                    y2="13"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="16"
                    y1="17"
                    x2="8"
                    y2="17"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polyline
                    points="10,9 9,9 8,9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe your tech product..."
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <svg
                  className="label-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    ry="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="8.5"
                    cy="8.5"
                    r="1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polyline
                    points="21,15 16,10 5,21"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Tech Product Image
              </label>

              {form.image ? (
                <div className="image-preview">
                  <img
                    src={form.image}
                    alt="Product preview"
                    className="preview-image"
                  />
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                    className="remove-image"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <line
                        x1="18"
                        y1="6"
                        x2="6"
                        y2="18"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="6"
                        y1="6"
                        x2="18"
                        y2="18"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading}
                    className="file-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="upload-label">
                    <div className="upload-content">
                      {uploading ? (
                        <>
                          <div className="loading"></div>
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <polyline
                              points="7,10 12,15 17,10"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <line
                              x1="12"
                              y1="15"
                              x2="12"
                              y2="3"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                          <span>Click to upload image</span>
                          <small>PNG, JPG, GIF up to 10MB</small>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="btn btn-primary"
              >
                {uploading ? (
                  <>
                    <div className="loading"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <span>Create Tech Product</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <line
                        x1="5"
                        y1="12"
                        x2="19"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <polyline
                        points="12,5 19,12 12,19"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
