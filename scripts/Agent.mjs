// apikey = "39c6b7ifZgKuyydjmgs6bs0kNJlKR0t8ZHAqpRmN";
// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", "bearer " + apikey);
// r = fetch("https://api.cohere.com/v1/chat", {
//   myHeaders,
//   body: `{
//     "chat_history": [
//       {
//         "roles": "USER",
//         "message": "Who discovered gravity?"
//       },
//       {
//         "role": "CHATBOT",
//         "message": "The man who is widely credited with discovering gravity is Sir Isaac Newton"
//       }
//     ],
//     "message": "What year was he born?",
//     "connectors": [
//       {
//         "id": "web-search"
//       }
//     ]
//   }`,
// });
// console.log(r);

// // Set your Cohere API key
const apiKey = "39c6b7ifZgKuyydjmgs6bs0kNJlKR0t8ZHAqpRmN";

// Set the endpoint and parameters
const endpoint = "https://api.cohere.com/v1/chat";
// const params = {
//   //   chat_history: [
//   //     {
//   //       role: "USER",
//   //       message:
//   //         "you are an mermaid code generator , you want create perfect visuals for the given discription ",
//   //     },
//   // {
//   //   role: "CHATBOT",
//   //   message:
//   //     "The man who is widely credited with discovering gravity is Sir Isaac Newton",
//   // },
//   //   ],
//   message:
//     "you are an high memaid code generator  give an mermaid code for human life cycle",
//   //   connectors: [
//   //     // {
//   //     //   id: "web-search",
//   //     // },
//   //   ],
// };

// Create the request headers
// const headers = {
//   Authorization: `Bearer ${apiKey}`,
//   "Content-Type": "application/json",
// };

// Create the request body
// const body = JSON.stringify(params);

// Make the request

// import { MermaidPasser } from "./utils.mjs";
// import {
//   sylabelsPromt,
//   explainPromt,
//   visualPromt,
//   mermaidPromt,
// } from "./Prompts.mjs";
// import { schemas } from "./schemas.mjs";
// import { Tools } from "./Tools.mjs";

export class Agents {
  constructor(url, apiKey) {
    this.url = url;
    // this.apiKey=apiKey
    this.headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };
  }
  setBody(params) {
    this.body = JSON.stringify(params);
  }
  async getData() {
    return await fetch(this.url, {
      method: "POST",
      headers: this.headers,
      body: this.body,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(JSON.parse(data.text));
        // console.log(data);
        return data;
      })
      .catch((error) => console.error(error));
  }
}

// const agt = new Agents(endpoint, apiKey);

// //sylables agent
// agt.setBody({
//   response_format: {
//     type: "json_object",
//     schema: schemas.sylables,
//   },
//   message: sylabelsPromt({ topic: "AI marketing" }),
// });

// const sy = await agt.getData().then((d) => {
//   return JSON.parse(d);
// });
// console.log(sy);

//explination agent
// agt.setBody({
//   message: explainPromt({
//     topic: "Exploring the Ocean Depths",
//     description: `Students will be able to explain the unique challenges and benefits of exploring the deep ocean.
//     They will understand the historical context of deep-sea exploration and the technological advancements that have made it possible.
//     By the end of the unit, students will be able to describe the diverse ecosystems and unique adaptations of deep-sea organisms.
//     Students will also learn about the ethical considerations and potential impacts of human exploration in this fragile environment.`,
//     // sy.syllabus.units[0].topics[0] + " under " + sy.syllabus.units[0].title,
//     // description: sy.syllabus.units[0].objective,
//   }),
//   tools: [
//     {
//       name: "textTool",
//       description: "display an text on the screen",
//       parameter_definitions: {
//         text: {
//           description: "text display on the screen",
//           type: "string",
//           required: true,
//         },
//       },
//     },
//     {
//       name: "diagramTool",
//       description: "its makes an svg from mermaid code",
//       parameter_definitions: {
//         code: {
//           description: "proper executable mermaid code to make an visuals",
//           type: "string",
//           required: true,
//         },
//       },
//     },
//   ],
//   // response_format: { type: "json_object" },
// });

// agt.setBody({
//   message: "how to give permition to the user in mysql (grant)",
// });
// agt.getData().then((d) => {
//   console.log(d.text);
// });

// visuals agent
// agt.setBody({
//   message: visualPromt({ topic: "social engenioring" }),
//   response_format: {
//     type: "json_object",
//     schema: schemas.visuals,
//   },
// });
// agt.getData().then((d) => {
//   console.log(d.text);
//   const slides = JSON.parse(d.text);
//   // console.log(slides);
//   // for (let i of slides.slides) {
//   //   for (let tools of i.visuals) {
//   //     // console.log(tools);

//   //     // console.log("########################################");
//   //   }
//   // }
// // });
// var tools = {
//   textTool: (d) => {
//     console.log("text", d);
//   },
//   diagramTool: (e) => {
//     console.log("diagram", e);
//   },
// };
// const samp = JSON.parse(`{
//   "slides": [
//   {
//   "visuals": [
//   {
//   "textTool": {
//   "text": "Social Engineering: An Overview"
//   }
//   },
//   {
//   "textTool": {
//   "text": "Social engineering is a tactic used by malicious actors to manipulate and deceive individuals into divulging sensitive information or performing actions that compromise security."
//   }
//   }
//   ],
//   "narration": "Welcome to our presentation on social engineering, a critical aspect of cybersecurity awareness. In the following slides, we'll explore the various techniques employed by attackers and how to recognize and defend against such threats."
//   },
//   {
//   "visuals": [
//   {
//   "textTool": {
//   "text": "Common Social Engineering Techniques"
//   }
//   },
//   {
//   "diagramTool": {
//   "context": "flowchart LR; Phishing -- Click on malicious links or download attachments --> Victim; Phishing -- Impersonate trusted entity --> Impersonation; Impersonation -- Gain access to sensitive data --> Bypassing Security; Bypassing Security -- Exploit trust to access restricted areas --> Physical Access; Physical Access -- Steal confidential information --> Data Theft"
//   }

//   ,
//   "textTool": {
//   "text": "Phishing: Attackers send fraudulent emails or messages pretending to be from reputable sources, tricking victims into revealing personal information or downloading malware."
//   }
//   },
//   {
//   "textTool": {
//   "text": "Impersonation: Scammers pretend to be someone the victim trusts, such as a colleague or authority figure, to gain access to secure areas or data."
//   }
//   },
//   {
//   "textTool": {
//   "text": "Bypassing Security: Exploiting trust relationships to bypass security measures and gain physical or digital access."
//   }
//   },
//   {
//   "textTool": {
//   "text": "Data Theft: Once inside, attackers steal confidential information, leading to data breaches and identity theft."
//   }
//   }
//   ],
//   "narration": "These are some of the most common social engineering techniques used by attackers. Phishing is the most prevalent, often leading to a chain of events that compromise security."
//   },
//   {
//   "visuals": [
//   {
//   "textTool": {
//   "text": "Recognizing Social Engineering Attacks"
//   }
//   },
//   {
//   "textTool": {
//   "text": "Be vigilant and look out for these red flags:"
//   }
//   },
//   {
//   "diagramTool": {
//   "context": "flowchart TD; Red Flags --- Urgency or Threats --> Phishing; Red Flags --- Unusual Requests --> Impersonation; Red Flags --- Vague Communication --> Scams; Red Flags --- Unexpected Contact --> Social Engineering Attempts"
//   }

//   ,
//   "textTool": {
//   "text": "Urgency or Threats: Be cautious of messages creating a sense of urgency or threatening consequences for inaction."
//   }
//   },
//   {
//   "textTool": {
//   "text": "Unusual Requests: Question requests that deviate from standard procedures or ask for sensitive data out of the blue."
//   }
//   },
//   {
//   "textTool": {
//   "text": "Vague Communication: Scrutinize vague or unclear messages, especially those with spelling or grammar errors."
//   }
//   },
//   {
//   "textTool": {
//   "text": "Unexpected Contact: Be wary of unsolicited communication from unknown sources."
//   }
//   }
//   ],
//   "narration": "Recognizing social engineering attacks is the first step to preventing them. Here are some common red flags to look out for in potential attacks."
//   },
//   {
//   "visuals": [
//   {
//   "textTool": {
//   "text": "Defending Against Social Engineering"
//   }
//   },
//   {
//   "textTool": {
//   "text": "Implement these best practices to enhance security:"
//   }
//   },
//   {
//   "diagramTool": {
//   "context": "flowchart TD; Best Practices --- Verify Requests --> Impersonation Prevention; Best Practices --- Educate Employees --> Awareness; Best Practices --- Multi-Factor Authentication --> Enhanced Security; Best Practices --- Regular Training --> Preparedness"
//   }

//   ,
//   "textTool": {
//   "text": "Verify Requests: Always double-check requests for sensitive information or access, especially from unfamiliar sources."
//   }
//   },
//   {
//   "textTool": {
//   "text": "Educate Employees: Regularly train staff to recognize social engineering tactics and report suspicious activities."
//   }
//   },
//   {
//   "textTool": {
//   "text": "Multi-Factor Authentication: Implement MFA to add an extra layer of security, making it harder for attackers to gain unauthorized access."
//   }
//   },
//   {
//   "textTool": {
//   "text": "Regular Training: Conduct frequent security awareness training to keep everyone informed and prepared."
//   }
//   }
//   ],
//   "narration": "Now that we've identified the threats, let's focus on defense. These best practices can significantly reduce the risk of falling victim to social engineering attacks."
//   },
//   {
//   "visuals": [
//   {
//   "textTool": {
//   "text": "Conclusion"
//   }
//   },
//   {
//   "textTool": {
//   "text": "Social engineering is a constant threat, but awareness is our strongest defense."
//   }
//   },
//   {
//   "textTool": {
//   "text": "By understanding common tactics and staying vigilant, we can protect ourselves and our organizations from potential security breaches."
//   }
//   },
//   {
//   "textTool": {
//   "text": "Remember, cybersecurity is a shared responsibility, and we all play a crucial role in safeguarding sensitive information."
//   }
//   }
//   ],
//   "narration": "In conclusion, social engineering is a sophisticated and ever-evolving threat, but by staying informed and implementing security best practices, we can significantly reduce the risk of falling victim to such attacks. Stay vigilant, and together, we can create a more secure digital environment."
//   }
//   ]
//   }
//   `);
// // console.log(samp.slides[4]);
// for (let slide of samp.slides) {
//   for (let visual of Object.entries(slide.visuals)) {
//     // console.log(visual[1], "\n ############################");
//     for (let k of Object.entries(visual[1])) {
//       console.log(Tools[k[0]](k[1]));
//       // switch (k[0]) {
//       //   case "textTool":
//       //     let { text } = k[1];
//       //     tools.textTool(text);
//       //     break;
//       //   case "diagramTool":
//       //     let { context } = k[1];
//       //     tools.diagramTool(context);
//       //     break;
//       // }
//       // tools[k]();
//     }
//   }
//   // console.log("@@@@@@@@@@@@");
// }
// agt.setBody({
//   message: mermaidPromt({
//     description:
//       ""  }),
// });
// agt.getData().then((d) => {
//   console.log(MermaidPasser(d.text));
// });
