"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/");
      } else {
        alert("Failed to delete tech product");
      }
    } catch (error) {
      alert("Error deleting tech product");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  }

  if (showConfirm) {
    return (
      <div className="delete-confirm">
        <p>Are you sure you want to delete this tech product?</p>
        <div className="confirm-actions">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn btn-danger"
          >
            {isDeleting ? (
              <>
                <div className="loading"></div>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2"/>
                  <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Yes, Delete</span>
              </>
            )}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="btn btn-outline"
            disabled={isDeleting}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="btn btn-danger"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
        <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2"/>
        <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2"/>
      </svg>
      Delete Tech Product
    </button>
  );
}
