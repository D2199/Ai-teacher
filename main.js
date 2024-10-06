// import { tag } from "./scripts/Tag.js";
// import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
// mermaid.initialize({
//   startOnLoad: false,

//   securityLevel: "loose",
// });

// // Example of using the render function
// const graphDefinition = `flowchart TD; BestPractices --- Verify-Requests --> ImpersonationPrevention; BestPractices --- EducateEmployees --> Awareness; BestPractices --- Multi-FactorAuthentication --> Enhanced-Security; Best-Practices --- Regular-Training --> Preparedness
// `;
// const drawDiagram = async function (code) {
//   try {
//     const { svg } = await mermaid.render("graphdiv", code);
//     const element = document.querySelector("#board");
//     element.innerHTML = svg;
//     return svg;
//   } catch (e) {
//     document.querySelector("#graphdiv").style.display = "none";
//     console.log("dd", e);
//   }
//   // conso
//   // console.log(svg);
// };
// drawDiagram(graphDefinition);
// await mermaid.run();

// // console.log(tag("div", "con", tag("div", "con1"), tag("div", "con2")));

// const board = document.querySelector("#board");
// // board.innerHTML = tag(
// //   "div",
// //   "con",
// //   tag("div", "con1", "hello"),
// //   tag("div", "con2", "hi")
// // );
// // const div = document.createElement("div");

// // div.classList.add("text2");

// // console.log(board.appendChild(div));

// // board.appendChild(
// //   tag(
// //     "div",
// //     "text",
// //     tag("div", "img"),
// //     tag(
// //       "a",
// //       "link",
// //       "hi",
// //       tag(
// //         "ul",
// //         "lists",
// //         tag("li", "litems", "item 1"),
// //         tag("li", "litems", "item 2"),
// //         tag("li", "litems", "item 3"),
// //         "some loste one text"
// //       )
// //     )
// //   )
// // );
// // console.log(document.querySelectorAll("ul"));

import { Agents } from "./scripts/Agent.mjs";
import { settings } from "./scripts/settings.mjs";
import { syllabusPrompt } from "./scripts/Prompts.mjs";
const { ApiKey, ApiEndpoint, source } = settings;
const SyllabusAgt = new Agents(ApiEndpoint, ApiKey);
// function renderSyllab(sylab) {
//   localStorage.setItem(sylab.course, sylab);

//   console.log(sylab);
// }
const loader = document.querySelector(".loader");
function getSylable(name, description) {
  SyllabusAgt.setBody(syllabusPrompt({ topic: name, description }));
  loader.style.display = "block";
  SyllabusAgt.getData().then((d) => {
    localStorage.setItem(name, d.text);
    loader.style.display = "none";
    const absoluteURL = new URL(
      "/Myproject/sylab_show.html?name=" + name,
      window.location.href
    );
    // Redirect to the absolute URL
    window.location.href = absoluteURL.href;
  });
}
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("course-name").value;
  const description = document
    .getElementById("course-description")
    .value.trim();

  if (localStorage.getItem(name)) {
    alert("the name already exist");
    return;
  }
  getSylable(name, description);

  // console.log(!localStorage.getItem(name));
  // console.log(name, description);
});
