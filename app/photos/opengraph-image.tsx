import { ImageResponse } from "next/og";
import { loadOgFonts, ogSize, ogContentType } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "keepsakes | phil";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const fonts = await loadOgFonts();

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
          paddingTop: "80px",
          paddingRight: "80px",
          paddingBottom: "140px",
          paddingLeft: "80px",
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
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: 2,
              padding: "8px 16px",
            }}
          >
            KEEPSAKES
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#0B0F1F",
            fontSize: 56,
            fontWeight: 500,
            lineHeight: 1.3,
            maxWidth: 900,
          }}
        >
          photos of people & things
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
