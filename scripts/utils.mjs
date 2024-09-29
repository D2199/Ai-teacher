export function MermaidPasser(text) {
  return text
    .match(/mermaid[\s\S]*```/)[0]
    .replace("mermaid", "")
    .replace(/`/g, "");
}
