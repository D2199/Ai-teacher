import { schemas } from "./schemas.mjs";

export const syllabusPrompt = (input) => {
  const message = `You are a curriculum maker in a college. Your task is to create a comprehensive syllabus for the given name ${input.topic}. Ensure the syllabus includes:
  
    - A course title
    - A description of the course and its objectives
    - At least five units, each with:
        - A title
        - Objectives (what students will learn from this unit)
        - Topics covered in the unit
        - Assignments or activities to enhance student learning
    
here is the detailed description for the syllabus
  ${input.description}
`;
  const param = {
    response_format: {
      type: "json_object",
      schema: schemas.sylables,
    },
    message,
  };
  return param;
};
export const explainPrompt = (input) => {
  const message = `Create a detailed guide or tutorial that thoroughly explains ${input.topic} from scratch and tailored to the "${input.description}", including:

  1. Introduction: Define the topic, its relevance, and importance.
  
  2. Fundamentals: Explain the basic concepts, principles, and terminology related to the topic.
  
  3. Key Components: Break down the topic into its core components or elements and explain each one in-depth.
  
  4. How it Works: Describe the processes, mechanisms, or workflows involved in the topic.
  
  5. Applications and Use Cases: Provide examples of how the topic is applied in real-world scenarios or industries.
  
  6. Benefits and Limitations: Discuss the advantages and disadvantages of the topic.
  
  7. Best Practices: Offer tips, recommendations, or guidelines for effectively working with or implementing the topic.
  
  8. Future Developments: Discuss potential future advancements, trends, or innovations related to the topic.
  
  9. Conclusion: Summarize the key points and takeaways from the guide.

  

  `;
  const param = {
    message,
    response_format: {
      type: "json_object",
      schema: schemas.visuals,
    },
  };
  return param;
};

`[{
  name:"textTool",
  description:"display an text on the screen",
  parameter_definitions:{
    text:{
      description :"text display on the screen",
      type:"string",
      required:true
    }
  }
},
{
  name:"diagramTool",
  description:"its makes an svg from mermaid code",
  parameter_definitions:{
    code:{
      description:"proper executable mermaid code to make an visuals",
      type:"string",
      required:true

    }
  }
}
]`;
export const visualPrompt = (input) => {
  const message = `
  You are a highly intelligent visualization agent specialized in illustrating complex topics using JavaScript Canvas with dynamic visual aids. Your objective is to create engaging and informative slides that break down information into clear, manageable parts, using text, graphs, images, and audio explanations to ensure the topic is well understood by the students.Give an give me a comprahansive explaination
  
example output
textTool{{text: "displayed text"}}: Displays text on the canvas at the specified coordinates with the given color.
diagramTool{{context:"desription or instructions"}}:gets an detailed instruction to make an mermaid diagram

 
  and here is description to make an slides:
  ${input.topic}`;
  const param = {
    message,
    response_format: {
      type: "json_object",
      schema: schemas.visuals,
    },
  };
  return param;
};
`Tools Available:
  
text_tool((text: "displayed text", color: "", location: (x: 10%, y: 20%)))): Displays text on the canvas at the specified coordinates with the given color.
diagram_tool(code:"the perfect syntax mermaid code to visuals"):Displays visuals like flowchart ,pichart ,etc.. with the help of mermaid code
Image_tool(url): Displays an image from a URL.

output format :
{
slides:[
(
visulas:[
(tools:textTool,arguments:(arg)),
(tools:diagramTool,arguments:(arg))
]
narrations:"text to speech"
),(
visulas:[
(tools:textTool,arguments:(arg)),
(tools:diagramTool,arguments:(arg))
]
narrations:"text to speech"

)
]
}

output in json format
artial_variables`;

export const mermaidPrompt = (input) => {
  const message = `Generate Mermaid code to visualize the topic "${input.description}". Provide a clear and concise diagram that effectively represents the key elements and relationships within the topic.`;
  const param = { message };
  return param;
};

export const kidExplainPrompt = (input) => {
  const message = `Imagine you are all scientists on a mission to explore and understand a mysterious new planet! This planet is full of wonders and secrets waiting to be discovered. Your job is to become experts in a specific field and uncover the knowledge hidden within this alien world. 

Today, we will focus on ${input.topic} , an essential concept that will help us navigate and survive on this planet. We will break down this topic into simple steps and explore it together, just like real scientists. 

By the end of our journey, you will have a comprehensive understanding of ${input.topic} , and who knows, you might even discover something new that could change the way we see this planet forever! Are you ready to embark on this exciting adventure and become masters of ${input.topic} ? 

example output
textTool{{text: "Markdown-formatted text"}}: get Markdown-formatted text display on the canvas at the specified coordinates with the given color.
diagramTool{{context:"desription or instructions"}}:gets an detailed instruction to make an mermaid diagram
`;
  const param = {
    message,
    response_format: {
      type: "json_object",
      schema: schemas.visuals,
    },
  };
  return param;
};

export const MagicalKeyExplainPrompt = (input) => {
  const message = `"Welcome, young scholars! Today, we embark on an exciting journey to unlock the secrets of ${input.topic}. Imagine ${input.topic} as a magical key that opens doors to a world of knowledge and understanding.


Our quest begins with a simple yet powerful question: What is ${input.topic}? We will delve into its core, exploring its definition, history, and significance. Like explorers mapping uncharted territories, we will navigate through its various aspects, uncovering the why, how, and when of ${input.topic}.


As we progress, we will discover the real-world applications and implications of ${input.topic}. How does it impact our daily lives? How can we utilize its principles to solve problems and make informed decisions? We will analyze case studies and examples to grasp the practical side of ${input.topic}.


But our journey doesn't end there. We will also delve into the theoretical framework of ${input.topic}, understanding the underlying concepts and theories that govern it. This will provide us with a deeper insight into its nature and behavior.


By the end of our exploration, you will not only have a comprehensive understanding of ${input.topic} but also the tools to apply this knowledge in various contexts. So, fasten your seatbelts, and let's embark on this intellectual adventure together!"

example output
textTool{{text: "displayed text"}}: Displays text on the canvas at the specified coordinates with the given color.
diagramTool{{context:"desription or instructions"}}:gets an detailed instruction to make an mermaid diagram
`;
  const param = {
    message,
    response_format: {
      type: "json_object",
      schema: schemas.visuals,
    },
  };
  return param;
};

export const AskingPrompt = (input) => {
  const message = `
  "I'd like to seek clarification on a specific aspect of ${input.topic} within the subject of ${input.unit}. My question is ${input.doubt}. I request a concise explanation, and I'd appreciate if we could keep the discussion centered on this topic, avoiding any tangents."
  `;
  const param = {
    message,
    response_format: {
      type: "json_object",
      schema: schemas.visuals,
    },
  };
  return param;
};
