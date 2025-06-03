import DeleteButton from "./DeleteButton"; // client component
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
    <main className="detail-container">
      <h1 className="detail-title">{product.name}</h1>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="detail-image"
        />
      )}

      <p className="detail-description">{product.description}</p>

      <p className="detail-price">
        <strong>Price: </strong>
        {product.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>

      <div className="detail-actions">
        <a href={`/products/${params.id}/edit`} className="detail-edit-button">
          Edit
        </a>
        <DeleteButton id={params.id} />
      </div>
    </main>
  );
}
