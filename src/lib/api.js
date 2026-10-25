
const BASE_URL = "https://fakestoreapi.com";
const REVALIDATE_SECONDS = 3600;

// Mengambil semua produk

export async function getProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
      },
    });

    if (!res.ok) {
      throw new Error(`FakeStore API returned HTTP ${res.status}`);
    }

    const products = await res.json();

    if (!Array.isArray(products)) {
      throw new Error("FakeStore API did not return a product list");
    }

    return products;
  } catch (error) {
    console.error("[getProducts] Failed to load products:", error);
    throw error;
  }
}


// Mengambil satu produk berdasarkan ID
export async function getProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`Gagal mengambil produk ID ${id}: ${res.status}`);
      return null;
    }

    const text = await res.text();

    if (!text) return null;

    const product = JSON.parse(text);

    return product?.id ? product : null;
  } catch (error) {
    console.error("Error getProduct:", error);
    return null;
  }
}

// Membuat slug dari nama dan ID produk
export function toSlug(title, id) {
  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");

  return words ? `${words}-${id}` : String(id);
}

// Mengambil ID dari slug
export function idFromSlug(slug) {
  const match = slug.match(/(?:^|-)(\d+)$/);
  return match ? Number(match[1]) : null;
}

// Format harga ke USD
export function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
