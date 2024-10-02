import { Agents } from "./Agent.mjs";
import { settings } from "./settings.mjs";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { MermaidPasser } from "./utils.mjs";
import { mermaidPrompt } from "./Prompts.mjs";
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
mermaid.initialize({
  startOnLoad: false,

  securityLevel: "loose",
});
export const Tools = {
  mermaideTool: function (name, code) {
    const mermaidecodeGen = new Agents();
    const diagram = document.createElement("div");
    diagram.classList.add("diagram");
    const { svg } = mermaid.render(name, code);
    diagram.innerHTML = svg;
    return diagram;
  },
  textTool: ({ text, color }) => {
    if (!text) return;
    const textEl = document.createElement("div");
    // textEl.setAttribute("class", "textElement");

    textEl.classList.add("textElement");
    textEl.classList.add(settings.TextAnimation);
    textEl.innerHTML = marked.parse(text);
    textEl.style.color = color;
    return textEl;
    // console.log(text);
  },
  diagramTool: async ({ context }) => {
    const mermaidecodeGen = new Agents(settings.ApiEndpoint, settings.ApiKey);
    console.log(context);
    const diagram = document.createElement("div");
    diagram.classList.add("diagram");
    mermaidecodeGen.setBody(mermaidPrompt({ description: context }));
    return await mermaidecodeGen.getData().then(async (d) => {
      const code = MermaidPasser(d.text);
      try {
        const { svg } = await mermaid.render("mermaidDiagram", code);
        diagram.innerHTML = svg;
        return diagram;
      } catch {
        diagram.style.display = "none";
        document.querySelector("#mermaidDiagram").style.display = "none";

        return diagram;
      }
    });
    console.log(code);
    return diagram;
  },
  audioTool: (speechText) => {
    const audio = null;
  },
};
