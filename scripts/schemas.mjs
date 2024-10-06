export const schemas = {
  sylables: {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Course Syllabus Schema",
    type: "object",
    properties: {
      course: {
        type: "string",
        description: "Title of the course",
      },
      syllabus: {
        type: "object",
        properties: {
          description: {
            type: "string",
            description: "Description of the course and its objectives",
          },
          units: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Title of the unit",
                },
                objective: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description: "Learning objectives for the unit",
                },
                topics: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description: "Topics covered in the unit",
                },
                assignments: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description: "Assignments or activities for the unit",
                },
              },
              required: ["title", "objective", "topics", "assignments"],
            },
          },
        },
        required: ["description", "units"],
      },
    },
    required: ["course", "syllabus"],
  },
  visuals: {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Slideshow Schema with Functions",
    type: "object",
    properties: {
      slides: {
        type: "array",
        description: "slides in here",
        items: {
          type: "object",
          properties: {
            visuals: {
              type: "array",
              description: "visuals to the slides using tools",
              items: {
                type: "object",
                description: "tools with arguments need to create visuals",
                enum: ["textTool", "diagramTool"],
                properties: {
                  diagramTool: {
                    type: "object",
                    description: "detailed instruction to make an diagram",
                    properties: {
                      context: {
                        type: "string",
                        description: "instruction to make an  diagram",
                      },
                    },
                    required: ["context"],
                  },
                  textTool: {
                    type: "object",
                    description: "display an markdown text to screen",
                    properties: {
                      text: {
                        type: "string",
                        description: "markdown text that display on the screen",
                      },
                      color: {
                        type: "string",
                        description:
                          "css color to color the text in the black board",
                      },
                    },
                    required: ["text"],
                  },
                },
                required: ["textTool"],
              },
            },
            narration: {
              type: "string",
              description:
                "A detailed narration for the slide with a minimum of 100 words.",
            },
          },
          required: ["visuals", "narration"],
        },
      },
    },
    required: ["slides"],
  },
};

//  arguments: {
//                     type: "object",
//                     description: "Arguments for the chosen function",
//                     properties: {
//                       textTool: {
//                         type: "object",
//                         description:
//                           "it gets an text as an input and display  it in the screen",
//                         properties: {
//                           text: {
//                             type: "string",
//                             description: "Text to display",
//                           },
//                           color: {
//                             type: "string",
//                             description: "Color of the text",
//                           },
//                           location: {
//                             type: "object",
//                             description: "Location of the text",
//                             properties: {
//                               x: {
//                                 type: "number",
//                                 description: "X coordinate",
//                               },
//                               y: {
//                                 type: "number",
//                                 description: "Y coordinate",
//                               },
//                             },
//                             required: ["x", "y"],
//                           },
//                         },
//                         required: ["text", "color", "location"],
//                       },
//                       diagramTool: {
//                         type: "object",
//                         description:
//                           "it gets an Description for the diagram conver into an mermaid code",
//                         properties: {
//                           description: {
//                             type: "string",
//                             description: "Description for the diagram",
//                           },
//                         },
//                         required: ["description"],
//                       },
//                     },
//                     required: ["textTool"],
//                   }
