// Sermon notes: notes-inbox/YYYY-MM-DD-name.docx -> src/content/notes/YYYY-MM-DD-name.md
// Blanks (runs of underscores) become {{blank}}; the notes page turns those into fill-in fields.
import { readdir, writeFile, mkdir } from "node:fs/promises";
import mammoth from "mammoth";
import TurndownService from "turndown";

const IN = "notes-inbox", OUT = "src/content/notes";
const td = new TurndownService({ headingStyle: "atx", emDelimiter: "*" });

export async function convert(path) {
  const { value: html } = await mammoth.convertToHtml({ path });
  const md = td.turndown(html.replace(/<img[^>]*>/g, ""))
    .replace(/(?:\\?_\s?){4,}/g, "{{blank}}")   // ____ or \_\_\_ (with stray spaces)
    .replace(/\*\*\s*\{\{blank\}\}\s*\*\*/g, "{{blank}}")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return md;
}

// First two non-empty lines of these notes are "Date, Scripture" and "Series N: Title".
export function frontmatter(file, md) {
  const lines = md.split("\n").map((l) => l.replace(/\*/g, "").trim()).filter(Boolean);
  const date = file.slice(0, 10);
  const scripture = (lines[0] || "").replace(/^[A-Za-z]+ \d{1,2}, \d{4},?\s*/, "");
  const title = lines[1] || file.slice(11).replace(/\.docx$/, "");
  const body = md.split("\n").slice(md.split("\n").findIndex((l) => l.replace(/\*/g, "").trim() === title) + 1).join("\n").trim();
  return { date, scripture, title, body };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await mkdir(OUT, { recursive: true });
  for (const f of (await readdir(IN)).filter((f) => /^\d{4}-\d{2}-\d{2}-.+\.docx$/.test(f))) {
    const { date, scripture, title, body } = frontmatter(f, await convert(`${IN}/${f}`));
    const out = `${OUT}/${f.replace(/\.docx$/, ".md")}`;
    await writeFile(out, `---\ntitle: ${JSON.stringify(title)}\ndate: ${date}\nscripture: ${JSON.stringify(scripture)}\nsource: ${JSON.stringify(f)}\n---\n\n${body}\n`);
    console.log("wrote", out);
  }
}
