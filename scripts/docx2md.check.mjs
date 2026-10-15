// Run: node scripts/docx2md.check.mjs
import assert from "node:assert/strict";
import { toMarkdown } from "./docx2md.mjs";

assert.equal(toMarkdown("<p>Servants are <u>entrusted</u>.</p>"), "Servants are {{blank:entrusted}}.");
assert.equal(toMarkdown("<p>Work to <u>enter the joy</u></p>"), "Work to {{blank:enter the joy}}");
assert.equal(toMarkdown("<p>Servants are ________</p>"), "Servants are {{blank}}");
assert.equal(toMarkdown("<p>Servants are <u>______</u></p>"), "Servants are {{blank}}");
assert.equal(toMarkdown("<p><strong>________</strong></p>"), "{{blank}}");
console.log("docx2md ok");
