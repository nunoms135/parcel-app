"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

/** featuredCount = how many products to show when the search box is empty. */
export default function ProductBrowser({ products, featuredCount = 5 }) {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();

  const visible = useMemo(() => {
    if (!term) return products.slice(0, featuredCount);
    return products.filter((p) =>
      [p.title, p.category, p.description].some((field) =>
        field.toLowerCase().includes(term)
      )
    );
  }, [products, term, featuredCount]);

  return (
    <section aria-labelledby="products-heading">
      <div className="browser-head">
        <h2 id="products-heading">
          {term
            ? `${visible.length} ${visible.length === 1 ? "result" : "results"} for “${query.trim()}”`
            : "Featured products"}
        </h2>
        <div className="search">
          <label htmlFor="search" className="sr-only">
            Search all products
          </label>
          <input
            id="search"
            type="search"
            placeholder="Search all products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>No products match “{query.trim()}”.</p>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setQuery("")}
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
