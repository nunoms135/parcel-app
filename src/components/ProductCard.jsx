import Image from "next/image";
import Link from "next/link";
import { formatPrice, toSlug } from "@/lib/api";
import FavoriteButton from "./FavoriteButton";

export default function ProductCard({ product }) {
  const href = `/products/${toSlug(product.title, product.id)}`;

  return (
    <article className="card">
      <div className="card-media">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 600px) 90vw, (max-width: 1000px) 33vw, 220px"
          className="contain"
        />
        <FavoriteButton productId={product.id} productTitle={product.title} />
      </div>
      <div className="card-body">
        <p className="card-category">{product.category}</p>
        <h3 className="card-title">{product.title}</h3>
        <p className="card-price">{formatPrice(product.price)}</p>
        <Link href={href} className="btn btn-outline">
          View Details
        </Link>
      </div>
    </article>
  );
}
