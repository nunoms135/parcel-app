import ProductBrowser from "@/components/ProductBrowser";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <section className="hero">
        <h1>Everyday things, picked well.</h1>
        <p>
          Clothing & Jewelry from one small catalog. Open any
          product for the full details.
        </p>
      </section>
      <ProductBrowser products={products} featuredCount={5} />
    </>
  );
}
