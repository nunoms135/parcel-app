
const BASE_URL = "https://dummyjson.com";
const REVALIDATE_SECONDS = 3600;

// Menyesuaikan format DummyJSON dengan format
// produk yang digunakan oleh komponen aplikasi.
function normalizeProduct(product) {
  return {
    ...product,
    image: product.thumbnail || product.images?.[0] || "",
    rating: {
      rate: product.rating ?? 0,
      count: product.reviews?.length ?? 0,
    },
  };
}

// Mengambil seluruh daftar produk.
export async function getProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products?limit=0`, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
      },
    });

    if (!res.ok) {
      throw new Error(`DummyJSON returned HTTP ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data.products)) {
      throw new Error("Invalid product list from DummyJSON");
    }

    return data.products.map(normalizeProduct);
  } catch (error) {
    console.error("[getProducts] Failed:", error);
    throw error;
  }
}

// Mengambil detail satu produk berdasarkan ID.
export async function getProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
      },
    });

    if (res.status === 404) return null;

    if (!res.ok) {
      throw new Error(`DummyJSON returned HTTP ${res.status}`);
    }

    const product = await res.json();

    if (!product || !product.id) return null;

    return normalizeProduct(product);
  } catch (error) {
    console.error("[getProduct] Failed:", error);
    throw error;
  }
}

// Contoh: "Essence Mascara" + 1
// menjadi "essence-mascara-1".
export function toSlug(title, id) {
  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");

  return words ? `${words}-${id}` : String(id);
}

// Mengambil ID dari slug produk.
export function idFromSlug(slug) {
  const match = slug.match(/(?:^|-)(\d+)$/);
  return match ? Number(match[1]) : null;
}

// Format harga ke mata uang USD.
export function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
