import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const templatePath = path.join(root, "public", "share-card-template.html");
const outPath = path.join(root, "public", "og-main.png");

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(`file://${templatePath}`, { waitUntil: "networkidle0" });
await page.screenshot({ path: outPath, type: "png" });
await browser.close();
console.log("Saved", outPath);
