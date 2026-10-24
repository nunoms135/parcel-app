import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import { formatPrice, getProduct, idFromSlug } from "@/lib/api";

async function loadProduct(slug) {
  const id = idFromSlug(slug);
  return id ? getProduct(id) : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  return {
    title: product ? product.title : "Product not found",
    description: product ? product.description.slice(0, 150) : undefined,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) notFound();

  return (
    <article className="detail">
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>{product.category}</span>
      </nav>

      <div className="detail-grid">
        <div className="detail-media">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 800px) 90vw, 480px"
            className="contain"
          />
        </div>

        <div className="detail-info">
          <p className="detail-category">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="rating">
            <span aria-hidden="true">★</span> {product.rating.rate.toFixed(1)}
            <span className="muted"> from {product.rating.count} reviews</span>
          </p>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className="detail-description">{product.description}</p>
          <div className="detail-actions">
            <FavoriteButton
              productId={product.id}
              productTitle={product.title}
              variant="full"
            />
            <Link href="/" className="btn btn-outline">
              Back to products
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
