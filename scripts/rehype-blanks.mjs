// Turns {{blank}} / {{blank:answer}} in sermon notes into fill-in text fields.
// With an answer, a hint button follows the field (the page script reveals it letter by letter).
const BLANK = /\{\{blank(?::([^}]*))?\}\}/g;

export function visit() {
  return (tree) => {
    let n = 0;
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.flatMap((c) => {
        if (c.type !== "text" || !c.value.includes("{{blank")) return walk(c), [c];
        const out = [];
        let last = 0;
        for (const m of c.value.matchAll(BLANK)) {
          if (m.index > last) out.push({ type: "text", value: c.value.slice(last, m.index) });
          n += 1;
          const answer = m[1]?.trim();
          out.push({ type: "element", tagName: "input", properties: { type: "text", className: ["blank"], ariaLabel: `Blank ${n}`, autocomplete: "off", dataBlank: n, dataAnswer: answer }, children: [] });
          if (answer) out.push({ type: "element", tagName: "button", properties: { type: "button", className: ["hint"], ariaLabel: `Hint for blank ${n}`, dataFor: n }, children: [{ type: "text", value: "?" }] });
          last = m.index + m[0].length;
        }
        if (last < c.value.length) out.push({ type: "text", value: c.value.slice(last) });
        return out;
      });
    };
    walk(tree);
  };
}
