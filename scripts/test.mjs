// const mcodetest =
//   "Here's an example of how you could represent the human life cycle using Mermaid, a tool for generating diagrams and visualizations:\n" +
//   "\n" +
//   "```mermaid\n" +
//   "graph LR;\n" +
//   "    subgraph Human Life Cycle\n" +
//   "    A[Conception] --> B[Embryonic Development]\n" +
//   "    B --> C[Fetal Development]\n" +
//   "    C --> D[Birth]\n" +
//   "    D --> E[Infancy]\n" +
//   "    E --> F[Childhood]\n" +
//   "    F --> G[Adolescence]\n" +
//   "    G --> H[Adulthood]\n" +
//   "    H --> I[Old Age]\n" +
//   "    I --> J[Death]\n" +
//   "    end\n" +
//   "```\n" +
//   "\n" +
//   "In this diagram, the human life cycle is represented as a linear sequence of stages. Each stage is connected to the next, forming a simple graph. You can customize and add more details to this diagram to make it more comprehensive. Mermaid offers various diagram types, so you can choose the most suitable one for your needs.";
// // const re = new RegExp(```mermaid([sS]*?)```);
// console.log(
//   mcodetest
//     .match(/mermaid[\s\S]*```/)[0]
//     .replace("mermaid", "")
//     .replace(/`/g, "")
// );
import { MermaidPasser } from "./utils.mjs";

import { Agents } from "./Agent.mjs";
import {
  MagicalKeyExplainPrompt,
  explainPrompt,
  kidExplainPrompt,
  visualPrompt,
  AskingPrompt,
  mermaidPrompt,
} from "./Prompts.mjs";
import { settings } from "./settings.mjs";
const VisualAgt = new Agents(settings.ApiEndpoint, settings.ApiKey);
VisualAgt.setBody(
  AskingPrompt({
    topic: "Introduction to Web Frameworks",
    unit: "Getting Started with Django ",
    doubt: "give an diagram which explain MVT",
  })
);
VisualAgt.getData().then((d) => {
  console.log(JSON.parse(d.text));
});
// VisualAgt.setBody(
//   mermaidPrompt({
//     description:
//       "This diagram illustrates the Model-View-Template (MVT) architecture pattern used in Django, a popular Python web framework. MVT is a variation of the Model-View-Controller (MVC) pattern, tailored for web development.\\\\[/n\\\\",
//   })
// );
// VisualAgt.getData().then((d) => {
//   console.log(MermaidPasser(d.text));
// });
