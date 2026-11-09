/** Publr public photos JSON API (no auth; user id from settings). */

/** Default gallery id — override locally with `NEXT_PUBLIC_PUBLR_USER_ID` if needed (public endpoint). */
export const PUBLR_USER_ID_DEFAULT = "8db1b899-5437-46ac-ad90-9e381c274ea7";

export const PUBLR_PHOTOS_API_BASE =
  "https://publr-production.up.railway.app/api/photos/";

export function publrPhotosUrl(userId: string): string {
  return `${PUBLR_PHOTOS_API_BASE}${encodeURIComponent(userId)}`;
}

export type PublrPhotosResponse = { photos: string[] };

/** Insert a Cloudinary transformation right after `/upload/` (no-op for non-Cloudinary URLs). */
function withCloudinaryTransform(url: string, transform: string): string {
  return url.replace(/\/upload\//, `/upload/${transform}/`);
}

/** Generate a tiny Cloudinary thumbnail URL (~1–2 KB) for blur-up placeholders. */
export function toPlaceholderUrl(url: string): string {
  return withCloudinaryTransform(url, "w_30,q_1,f_jpg");
}

/**
 * Grid-sized image. Originals can be 12MP+ (~48MB decoded each), which makes
 * iOS Safari kill the tab ("A problem repeatedly occurred"). Tiles never render
 * wider than ~600 CSS px, so 900px wide covers 1.5–2x screens.
 */
export function toThumbUrl(url: string): string {
  return withCloudinaryTransform(url, "w_900,c_limit,q_auto,f_auto");
}

/** Lightbox-sized image — big enough for full screen, far smaller than the original. */
export function toLargeUrl(url: string): string {
  return withCloudinaryTransform(url, "w_2000,h_2000,c_limit,q_auto,f_auto");
}
