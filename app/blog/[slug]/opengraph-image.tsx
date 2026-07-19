import { ImageResponse } from "next/og";
import { loadOgFonts, ogSize, ogContentType } from "@/lib/og";
import { getPostMetaSync, getPostSlugs } from "@/lib/posts";

export const runtime = "nodejs";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

function titleFontSize(title: string): number {
  if (title.length > 60) return 40;
  if (title.length > 36) return 48;
  return 56;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fonts = await loadOgFonts();

  let title = "phil's blog";
  let eyebrow = "WRITING";

  try {
    const meta = getPostMetaSync(slug);
    title = meta.title;
    const parts: string[] = [];
    if (meta.date) parts.push(meta.date);
    if (meta.readingTime != null) parts.push(`${meta.readingTime}m read`);
    eyebrow = parts.join(" · ").toUpperCase() || "WRITING";
  } catch {
    // fall back to defaults above
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "80px",
          fontFamily: "DM Mono",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#E1E4EA",
              color: "#0B0F1F",
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: 1,
              padding: "8px 16px",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#0B0F1F",
            fontSize: titleFontSize(title),
            fontWeight: 500,
            lineHeight: 1.3,
            maxWidth: 950,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div
            style={{ display: "flex", width: "100%", height: 2, backgroundColor: "#0B0F1F", opacity: 0.15 }}
          />
          <div style={{ display: "flex", marginTop: 24, fontSize: 24, color: "#8250df" }}>
            PHILLIPA BENNETT-EGHAN
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
