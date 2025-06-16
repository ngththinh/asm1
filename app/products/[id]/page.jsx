import Link from "next/link";
import DeleteButton from "./DeleteButton";
import "./ProductDetail.css";

async function getProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export default async function ProductDetail({ params }) {
  const product = await getProduct(params.id);

  return (
    <div className="detail-wrapper">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/" className="breadcrumb-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <polyline
                points="9,22 9,12 15,12 15,22"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            Home
          </Link>
          <svg
            className="breadcrumb-separator"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <polyline
              points="9,18 15,12 9,6"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span className="breadcrumb-current">Tech Product Details</span>
        </nav>

        <div className="detail-container">
          <div className="detail-content">
            {/* Product Image */}
            <div className="detail-image-section">
              {product.image ? (
                <div className="detail-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="detail-image"
                  />
                  <div className="image-overlay">
                    <button className="image-zoom">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="11"
                          cy="11"
                          r="8"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="m21 21-4.35-4.35"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="11"
                          y1="8"
                          x2="11"
                          y2="14"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="8"
                          y1="11"
                          x2="14"
                          y2="11"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="detail-image-placeholder">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
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
                  <span>No Image Available</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="detail-info-section">
              <div className="detail-header">
                <h1 className="detail-title">{product.name}</h1>
                <div className="detail-price">
                  {product.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>

              <div className="detail-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              <div className="detail-meta">
                <div className="meta-item">
                  <svg
                    className="meta-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <polyline
                      points="12,6 12,12 16,14"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Added recently</span>
                </div>
                <div className="meta-item">
                  <svg
                    className="meta-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>In stock</span>
                </div>
              </div>

              <div className="detail-actions">
                <Link
                  href={`/products/${params.id}/edit`}
                  className="btn btn-primary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Edit Tech Product
                </Link>
                <DeleteButton id={params.id} />
                <Link href="/" className="btn btn-outline">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline
                      points="15,18 9,12 15,6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Back to Tech Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
