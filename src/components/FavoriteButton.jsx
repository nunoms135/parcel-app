"use client";

import { useFavorites } from "@/lib/useFavorites";

function Heart({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    >
      <path d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.6 3.6 4.5 6.9 4.5c2 0 3.5 1.1 5.1 3 1.6-1.9 3.1-3 5.1-3 3.3 0 5.3 3.1 4.1 6.6-1.7 4.8-9.2 9.4-9.2 9.4z" />
    </svg>
  );
}

/**
 * variant "icon" is the compact heart on cards,
 * variant "full" is the labeled button on the detail page.
 */
export default function FavoriteButton({
  productId,
  productTitle,
  variant = "icon",
}) {
  const { favorites, toggle } = useFavorites();
  const isFavorite = favorites.includes(productId);

  if (variant === "icon") {
    return (
      <button
        type="button"
        className="fav-icon"
        data-active={isFavorite}
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Remove ${productTitle} from favorites`
            : `Add ${productTitle} to favorites`
        }
        onClick={() => toggle(productId)}
      >
        <Heart filled={isFavorite} />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="btn btn-primary fav-full"
      data-active={isFavorite}
      aria-pressed={isFavorite}
      onClick={() => toggle(productId)}
    >
      <Heart filled={isFavorite} />
      {isFavorite ? "Added to Favorites" : "Add to Favorite"}
    </button>
  );
}
