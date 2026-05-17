/** Publr public photos JSON API (no auth; user id from settings). */

/** Default gallery id — override locally with `VITE_PUBLR_USER_ID` if needed (public endpoint). */
export const PUBLR_USER_ID_DEFAULT = "8db1b899-5437-46ac-ad90-9e381c274ea7";

export const PUBLR_PHOTOS_API_BASE =
  "https://publr-production.up.railway.app/api/photos/";

export function publrPhotosUrl(userId: string): string {
  return `${PUBLR_PHOTOS_API_BASE}${encodeURIComponent(userId)}`;
}

export type PublrPhotosResponse = { photos: string[] };

/** Generate a tiny Cloudinary thumbnail URL (~1–2 KB) for blur-up placeholders. */
export function toPlaceholderUrl(url: string): string {
  return url.replace(/\/upload\//, "/upload/w_30,q_1,f_jpg/");
}
