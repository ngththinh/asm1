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
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading tech product details...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="error-container">
        <div className="error-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <h2>Error Loading Tech Product</h2>
        <p>{fetchError}</p>
        <button onClick={() => router.push("/")} className="btn btn-primary">
          Back to Tech Products
        </button>
      </div>
    );
  }

  if (!form) {
    return null;
  }

  return (
    <div className="form-wrapper">
      <div className="container">
        <div className="form-container">
          <div className="form-header">
            <div className="form-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h1 className="form-title">Edit Tech Product</h1>
            <p className="form-subtitle">Update your tech product information</p>
          </div>

          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <svg className="label-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Product Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={loading || uploadingImage}
                  placeholder="Enter tech product name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <svg className="label-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 1v6m0 6v6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Price (VND)
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                  disabled={loading || uploadingImage}
                  placeholder="0.00"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <svg className="label-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                disabled={loading || uploadingImage}
                placeholder="Describe your tech product..."
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <svg className="label-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Tech Product Image
              </label>

              {form.image ? (
                <div className="image-preview">
                  <img src={form.image} alt="Product preview" className="preview-image" />
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, image: "" }))}
                    className="remove-image"
                    disabled={loading || uploadingImage}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
                      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading || uploadingImage}
                    className="file-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="upload-label">
                    <div className="upload-content">
                      {uploadingImage ? (
                        <>
                          <div className="loading"></div>
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2"/>
                            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <span>Click to upload new image</span>
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
                onClick={() => router.push(`/products/${params.id}`)}
                className="btn btn-outline"
                disabled={loading || uploadingImage}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploadingImage}
                className="btn btn-primary"
              >
                {loading || uploadingImage ? (
                  <>
                    <div className="loading"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <span>Update Tech Product</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2"/>
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
