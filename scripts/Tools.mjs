// import Agents from "./Agent.mjs";
import { settings } from "./settings.mjs";
// import { MermaidPasser } from "./utils.mjs";
// import { mermaidPrompt } from "./Prompts.mjs";
export const Tools = {
  mermaideTool: function (name, code) {
    const mermaidecodeGen = new Agents();
    const diagram = document.createElement("div");
    diagram.classList.add("diagram");
    const { svg } = mermaid.render(name, code);
    diagram.innerHTML = svg;
    return diagram;
  },
  textTool: ({ text }) => {
    if (!text) return;
    const textEl = document.createElement("div");
    // textEl.setAttribute("class", "textElement");
    textEl.classList.add("textElement");
    textEl.classList.add(settings.TextAnimation);
    textEl.innerHTML = text;
    return textEl;
    // console.log(text);
  },
  diagramTool: async (code) => {
    // const mermaidecodeGen = new new Agents(settings.ApiEndpoint, settings.ApiKey);
    // mermaidecodeGen.setBody(mermaidPrompt(code))
    // mermaidecodeGen.getDate().then((d)=>{
    //   MermaidPasser(d)
    // })
    const diagram = document.createElement("div");
    diagram.classList.add("diagram");
    const { svg } = await mermaid.render("mermaidDiagram", code);
    diagram.innerHTML = svg;
    return diagram;
  },
  audioTool: (speechText) => {
    const audio = null;
  },
};
