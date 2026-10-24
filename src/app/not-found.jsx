import Link from "next/link";

export default function NotFound() {
  return (
    <section className="contact">
      <h1>Product not found</h1>
      <p className="lead">
        That link doesn’t match anything in the catalog. It may have been
        removed or mistyped.
      </p>
      <Link href="/" className="btn btn-primary">
        Browse products
      </Link>
    </section>
  );
}
