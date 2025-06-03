"use client";

import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">
        MyStore
      </Link>{" "}
      <div className="navbar-links">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/products/new" className="nav-link">
          Create Product
        </Link>
      </div>
    </nav>
  );
}
