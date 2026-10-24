const BASE_URL = "https://fakestoreapi.com";
const REVALIDATE_SECONDS = 3600;

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`Could not load products (status ${res.status}).`);
  }
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return null;
  // FakeStore returns an empty body (status 200) for ids that don't exist.
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** "Mens Casual Slim Fit" + 4 -> "mens-casual-slim-fit-4" */
export function toSlug(title, id) {
  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  return words ? `${words}-${id}` : String(id);
}

/** Pulls the product id back out of a slug. */
export function idFromSlug(slug) {
  const match = slug.match(/(?:^|-)(\d+)$/);
  return match ? Number(match[1]) : null;
}

export function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
