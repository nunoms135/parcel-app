# Parcel — Next.js product showcase

## Requirements checklist

| Requirement | Where |
| --- | --- |
| Home page `/` with 5 products (image, name, "View Details") | `src/app/page.jsx`, `src/components/ProductCard.jsx` |
| Product detail page `/products/[slug]` | `src/app/products/[slug]/page.jsx` |
| Navigation with `<Link>` (Home, Contact) | `src/components/Header.jsx`, `src/app/contact/page.jsx` |
| "Add to Favorite" with `useState` + `useEffect` | `src/lib/useFavorites.js`, `src/components/FavoriteButton.jsx` |
| Optional: search | `src/components/ProductBrowser.jsx` (searches all 20 products) |
| Optional: styling | `src/app/globals.css` |

## How it works

- Slugs look like `mens-casual-slim-fit-2`. The trailing number is the product
  id used to call `GET /products/:id`.
- Favorites are saved in `localStorage`, so they survive a refresh. The header
  count updates live.
- Product data is cached for one hour (`revalidate`).

## Run locally

```bash
npm install
npm run dev
```
And click the link in Local/Network
