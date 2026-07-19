import fs from "fs";
import path from "path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export async function loadOgFonts() {
  const fontsDir = path.join(process.cwd(), "src/fonts");
  const [regular, medium] = await Promise.all([
    fs.promises.readFile(path.join(fontsDir, "DMMono-Regular.woff")),
    fs.promises.readFile(path.join(fontsDir, "DMMono-Medium.woff")),
  ]);

  return [
    {
      name: "DM Mono",
      data: regular,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "DM Mono",
      data: medium,
      weight: 500 as const,
      style: "normal" as const,
    },
  ];
}
