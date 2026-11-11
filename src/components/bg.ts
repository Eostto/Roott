import type { CSSProperties } from "react";

/**
 * Fundal cu imagine + gradient de rezervă. Dacă imaginea din /public/images
 * lipsește încă, se vede doar gradientul — pagina arată bine și fără poze.
 */
export function bg(image: string | undefined, fallback: string): CSSProperties {
  return {
    backgroundImage: image ? `url("${image}"), ${fallback}` : fallback,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}
