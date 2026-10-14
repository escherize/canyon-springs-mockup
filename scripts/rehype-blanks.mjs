// Turns {{blank}} in sermon notes into fill-in text fields.
export function visit() {
  return (tree) => {
    let n = 0;
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.flatMap((c) => {
        if (c.type !== "text" || !c.value.includes("{{blank}}")) return walk(c), [c];
        return c.value.split("{{blank}}").flatMap((part, i) => {
          const bits = part ? [{ type: "text", value: part }] : [];
          if (i === 0) return bits;
          n += 1;
          const input = { type: "element", tagName: "input", properties: { type: "text", className: ["blank"], ariaLabel: `Blank ${n}`, autocomplete: "off", dataBlank: n }, children: [] };
          return [input, ...bits];
        });
      });
    };
    walk(tree);
  };
}
