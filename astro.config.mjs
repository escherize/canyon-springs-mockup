import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import { visit } from "./scripts/rehype-blanks.mjs";

// GitHub Pages serves this repo at /canyon-springs-mockup/.
export default defineConfig({
  site: "https://escherize.com",
  base: "/canyon-springs-mockup",
  trailingSlash: "always",
  markdown: { processor: unified({ rehypePlugins: [visit] }) },
});
