// Creates a Buttondown email DRAFT for each blog post passed in.
// You review and send it from Buttondown, so nothing goes out by surprise.
//
// usage: BUTTONDOWN_API_KEY=… node scripts/buttondown-draft.mjs src/content/blog/my-post.mdx [...]
// DRY_RUN=1 prints the email instead of creating it.

import fs from "node:fs";
import path from "node:path";

const SITE = "https://www.bennett-eghan.com";
const API = "https://api.buttondown.com/v1/emails";
const MAX_INTRO = 320;

function readMeta(raw, slug) {
  const match = raw.match(/export const meta\s*=\s*(\{[\s\S]*?\})\s*;?\s*(?:\r?\n|$)/);
  if (!match) return { title: slug };
  return new Function(`return (${match[1]});`)();
}

// First real paragraph of the post, with MDX/markdown stripped.
function firstParagraph(raw) {
  const body = raw.replace(/export const meta\s*=\s*\{[\s\S]*?\}\s*;?/, "");
  const blocks = body.split(/\r?\n\s*\r?\n/);
  for (const block of blocks) {
    const text = block
      .split(/\r?\n/)
      .filter((l) => !/^\s*(import|export|<|#|```|!\[|>|\||-{3,})/.test(l))
      .join(" ")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → text
      .replace(/[*_`]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length >= 40) {
      return text.length > MAX_INTRO ? text.slice(0, MAX_INTRO).replace(/\s+\S*$/, "") + "…" : text;
    }
  }
  return "";
}

function buildEmail(file) {
  const slug = path.basename(file, ".mdx");
  const raw = fs.readFileSync(file, "utf-8");
  const meta = readMeta(raw, slug);
  const url = `${SITE}/blog/${slug}`;
  const intro = meta.description || firstParagraph(raw);
  const body = [
    "hi! a new post is up.",
    "",
    `**${meta.title}**`,
    "",
    intro,
    "",
    `[read it on the site →](${url})`,
  ].join("\n");
  return { subject: meta.title, body };
}

async function createDraft(email, key) {
  const res = await fetch(API, {
    method: "POST",
    headers: { Authorization: `Token ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ ...email, status: "draft" }),
  });
  if (!res.ok) throw new Error(`buttondown ${res.status}: ${await res.text()}`);
}

const files = process.argv.slice(2).filter((f) => f.endsWith(".mdx"));
const key = process.env.BUTTONDOWN_API_KEY;
const dryRun = process.env.DRY_RUN === "1";

if (files.length === 0) {
  console.log("no new posts, nothing to do");
  process.exit(0);
}
if (!key && !dryRun) {
  console.log("BUTTONDOWN_API_KEY not set, skipping");
  process.exit(0);
}

let failed = false;
for (const file of files) {
  const email = buildEmail(file);
  if (dryRun) {
    console.log(`--- ${email.subject}\n${email.body}\n`);
    continue;
  }
  try {
    await createDraft(email, key);
    console.log(`draft created: ${email.subject}`);
  } catch (err) {
    failed = true;
    console.error(`failed for ${file}: ${err.message}`);
  }
}
process.exit(failed ? 1 : 0);
