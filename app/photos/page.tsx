import type { Metadata } from "next";
import { PhotosGallery } from "@/components/photos-gallery";
import { publrPhotosUrl, PUBLR_USER_ID_DEFAULT } from "@/lib/publr";

export const metadata: Metadata = {
  title: "phil | keepsakes",
  description: "keepsakes from publr",
  openGraph: {
    title: "keepsakes | phil",
    description: "keepsakes from publr",
    url: "https://www.bennett-eghan.com/photos",
    type: "website",
  },
};

export default async function PhotosPage() {
  const userId = process.env.NEXT_PUBLIC_PUBLR_USER_ID?.trim() || PUBLR_USER_ID_DEFAULT;

  let initialPhotos: string[] = [];
  if (userId) {
    try {
      const res = await fetch(publrPhotosUrl(userId), {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const data = (await res.json()) as { photos: string[] };
        initialPhotos = Array.isArray(data.photos) ? data.photos : [];
      }
    } catch {
      // fall through — client component retries
    }
  }

  return <PhotosGallery userId={userId} initialPhotos={initialPhotos} />;
}
