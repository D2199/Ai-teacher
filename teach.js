import { Agents } from "./scripts/Agent.mjs";
import {
  visualPrompt,
  kidExplainPrompt,
  AskingPrompt,
} from "./scripts/Prompts.mjs";
import { settings } from "./scripts/settings.mjs";
import { Tools } from "./scripts/Tools.mjs";
import { render, Presentation } from "./scripts/render.mjs";
const url = new URL(window.location.href);
const nameid = url.searchParams.get("name");
if (!localStorage.getItem(nameid)) alert("name not found.");
else {
  try {
    const Sylabel = JSON.parse(localStorage.getItem(nameid));

    document.getElementsByTagName("title").innerHTML = Sylabel.course;
    renderSylab(Sylabel);
    console.log(Sylabel);
  } catch (e) {
    console.log(e);
    alert("name not found.");
  }
}
const Sylabel = JSON.parse(localStorage.getItem(nameid));
const Settings = JSON.parse(localStorage.getItem("settings"));
console.log(Settings);
let cuttentTopic = {};
cuttentTopic.course = Sylabel.course;
const loader = document.querySelector(".loader");
const presentation = new Presentation(Settings.AutoPlay);
// const playBtn = document.getElementsByClassName("play-btn");
// for (let i = 0; i < playBtn.length; i++) {
//   playBtn[i].addEventListener("click", (ev) => {
//     const unit_index = ev.target.parentElement.dataset["unitid"];
//     // console.log(ev.target.parentElement.dataset["unitid"]);
//     for (let topic of Sylabel.syllabus.units[unit_index].topics) {
//       teache(
//         topic +
//           " under " +
//           Sylabel.syllabus.units[unit_index] +
//           " on " +
//           Sylabel.course
//       );
//     }
//   });
// }
const topicPlay = document.getElementsByClassName("topics");

for (let i = 0; i < topicPlay.length; i++) {
  topicPlay[i].addEventListener("click", (ev) => {
    // teache()
    let topicid = ev.target.dataset["topicid"];
    for (let v of ev.target.parentElement.children) {
      let unitid = v.dataset["unitid"];
      if (unitid) {
        play(unitid, topicid);
      }
    }
  });
}
function play(unitIndex, topicIndex = 0) {
  const topic = Sylabel.syllabus.units[unitIndex].topics[topicIndex];
  cuttentTopic.topic = topic;
  cuttentTopic.unit = Sylabel.syllabus.units[unitIndex];
  teache(
    topic +
      " under " +
      Sylabel.syllabus.units[unitIndex] +
      " on " +
      Sylabel.course
  );
}
function renderSylab(sylab) {
  const sylabCon = document.querySelector(".sylab");
  sylabCon.innerHTML = `
      <h4 class="title">${sylab.course}</h4>
      `;
  sylab.syllabus.units.forEach((unit, i) => {
    const detailEl = document.createElement("details");
    detailEl.innerHTML = `
              <summary data-UnitID="${i}">${unit.title}  <span class="play-btn" ></span></summary>
              `;
    unit.topics.forEach((topic, i) => {
      detailEl.innerHTML += `<li data-TopicID="${i}" class="topics">${topic}</li>`;
    });

    sylabCon.appendChild(detailEl);
  });
}

async function teache(topic) {
  const VisualAgt = new Agents(Settings.ApiEndpoint, Settings.ApiKey);
  VisualAgt.setBody(visualPrompt({ topic }));
  loader.style.display = "flex";
  await VisualAgt.getData().then((d) => {
    try {
      let slides = JSON.parse(d.text);
      console.log(slides);
      // renderVisuals()
      loader.style.display = "none";
      presentation.slides = slides.slides;
      presentation.renderAllVisualsAsync();
      // presentation.render(slides.slides);
      // renderAllSlidesAsync(slides.slides);
    } catch {
      alert("server side error please try again..");
    }
  });
}

var sample = {
  slides: [
    {
      visuals: [
        {
          textTool: {
            text: "Introduction to Python: Unlocking the Power of a Versatile Programming Language",
          },
        },
      ],
      narration:
        "Welcome, fellow scientists, to our exploration of Python, a programming language that has revolutionized the way we interact with technology. Today, we embark on a journey to uncover its origins, widespread adoption, and the diverse applications that make Python an indispensable tool in our digital universe.",
    },
    {
      visuals: [
        { textTool: { text: "test diagram" } },
        { diagramTool: { context: "give an mvt diagram of django" } },
      ],
      narration:
        "Python's story begins in the late 1980##s with Guido van Rossum, a Dutch programmer. Van Rossum sought to create a language that was powerful yet easy to read and write. In 1991, Python was born, named after the British comedy group Monty Python, reflecting its creator's playful spirit. Over the years, Python has evolved through various versions, with Python 2 and Python 3 being the most significant.",
    },
    {
      visuals: [{ textTool: { text: "A Brief History of Python" } }],
      narration:
        "Python's story begins in the late 1980##s with Guido van Rossum, a Dutch programmer. Van Rossum sought to create a language that was powerful yet easy to read and write. In 1991, Python was born, named after the British comedy group Monty Python, reflecting its creator's playful spirit. Over the years, Python has evolved through various versions, with Python 2 and Python 3 being the most significant.",
    },
    {
      visuals: [{ textTool: { text: "Python's Rise to Popularity" } }],
      narration:
        "Python's popularity can be attributed to several factors. Firstly, its simplicity and readability make it accessible to beginners and experienced developers alike. The language's syntax is clean and intuitive, allowing for efficient coding. Additionally, Python's versatility is unparalleled. It finds applications in web development, data science, machine learning, automation, and more. Its extensive library support and vibrant community contribute to its widespread adoption.",
    },
    {
      visuals: [
        { textTool: { text: "Web Development" } },
        { textTool: { text: "- Django and Flask frameworks" } },
        { textTool: { text: "- Content management systems" } },
      ],
      narration:
        "Python shines in web development, offering powerful frameworks like Django and Flask. These tools simplify the creation of dynamic websites and web applications. Python also powers content management systems, making it a favorite for building and managing websites.",
    },
    {
      visuals: [
        { textTool: { text: "Data Science and Machine Learning" } },
        { textTool: { text: "- Libraries: NumPy, Pandas, TensorFlow" } },
        { textTool: { text: "- Data analysis, visualization, and AI" } },
      ],
      narration:
        "In the realm of data science and machine learning, Python is a powerhouse. Libraries like NumPy and Pandas provide efficient data manipulation, while TensorFlow enables complex machine learning tasks. Python's versatility in handling data makes it a top choice for researchers and data analysts.",
    },
    {
      visuals: [
        { textTool: { text: "Automation and Scripting" } },
        { textTool: { text: "- Task automation" } },
        { textTool: { text: "- System administration" } },
      ],
      narration:
        "Python's simplicity makes it ideal for automation and scripting. Developers use it to automate repetitive tasks, streamline workflows, and manage system administration. Its ability to interact with operating systems and other software makes Python a versatile tool for various automation needs.",
    },
    {
      visuals: [
        { textTool: { text: "Community and Support" } },
        { textTool: { text: "- Active community" } },
        { textTool: { text: "- Extensive documentation and resources" } },
      ],
      narration:
        "One of Python's greatest strengths is its vibrant community. Developers worldwide contribute to its growth, creating libraries, frameworks, and resources. The Python community offers extensive documentation, tutorials, and forums, making it easy for newcomers to learn and for experienced developers to collaborate.",
    },
    {
      visuals: [
        { textTool: { text: "Conclusion: Python's Impact and Future" } },
      ],
      narration:
        "In conclusion, Python's impact on the programming world is undeniable. Its versatility, simplicity, and community support have made it a go-to language for a wide range of applications. As technology continues to evolve, Python's role in shaping the digital landscape will only become more significant, offering endless possibilities for innovation and exploration.",
    },
  ],
};
var autoplay = true;
let countSlide = 7;
// teache("Introduction to Python: Its history, popularity, and use cases.");
function renderVisuals(slide) {
  const renderCon = document.querySelector("#renderer");
  console.log(slide);
  for (let visual of Object.entries(slide.visuals)) {
    for (let k of Object.entries(visual[1])) {
      renderCon.appendChild(Tools[k[0]](k[1]));
    }
  }
  setCaption(slide.narration);
  // clear(renderCon);
  const naration = speech(slide.narration);
  // if (autoplay) {
  naration.onend = () => {
    if (countSlide < sample.slides.length) {
      clear(renderCon);
      // renderVisuals(sample.slides[countSlide]);
      countSlide++;
    }
  };
  // }
}

async function renderVisualsAsync(slide) {
  const renderCon = document.querySelector("#renderer");

  // Clear previous content
  renderCon.innerHTML = "";

  // Render visuals
  for (const [visualKey, visualValue] of Object.entries(slide.visuals)) {
    for (const [propertyKey, propertyValue] of Object.entries(visualValue)) {
      const element = Tools[propertyKey](propertyValue);
      renderCon.appendChild(element);
    }
  }

  // Set caption or narration
  setCaption(slide.narration);

  // Play narration or speech asynchronously
  const narration = speech(slide.narration);
  await new Promise((resolve) => {
    narration.onend = resolve;
  });
}

// Example usage:
async function renderAllSlidesAsync(slides) {
  for (const slide of slides) {
    await renderVisualsAsync(slide);
  }
}

// for(let slide of sample.slides){}
// renderVisuals(sample.slides[0]);

function setCaption(narration) {
  document.querySelector("#caption").innerHTML = narration;
}
function clear(con) {
  con.childNodes.forEach((child, i) => {
    child.style.animationDirection = "reverse";
    setTimeout(() => {}, 1000);
  });
}
function speech(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 0.7;
  speech.lang = "en-GB";
  speech.pitch = 1;
  speech.voice = speechSynthesis.getVoices()[9359];
  let i = 0;
  speech.onend = (e) => {
    console.log(e);
  };
  // for (let v of speechSynthesis.getVoices()) {
  //   if ("en" in v) {
  //     console.log(i, v.lang);
  //   }
  //   i++;
  // }
  // console.log(speechSynthesis.getVoices()[9].lang);
  console.log(speechSynthesis.speak(speech));
  return speech;
}
const sms = document.querySelector("#msg");
const postMsg = document.querySelector(".post-msg");
const smsAgent = new Agents(settings.ApiEndpoint, settings.ApiKey);

const sendBtn = document.querySelector("#send-msg");
sendBtn.addEventListener("click", () => {
  console.log(sms.value);
  postMsg.innerHTML += `<div class="msgs">${sms.value}</div>`;
  smsAgent.setBody(
    AskingPrompt({
      topic: cuttentTopic.topic,
      course: Sylabel.course,
      unit: cuttentTopic.unit,
      doubt: sms.value,
    })
  );
  smsAgent.getData().then((d) => {
    const explain = JSON.parse(d.text);
    if (presentation.rendering) {
      presentation.slides = [...presentation.slides, ...explain.slides];
      console.log(presentation.slides);
    } else {
      console.log(explain.slides);
      presentation.slides = [...presentation.slides, ...explain.slides];
      presentation.renderAllVisualsAsync();
    }
  });
  sms.value = "";
});

document.querySelector("#note").addEventListener("change", (e) => {
  Sylabel.notes += e.target.value;
  localStorage.setItem(nameid, JSON.stringify(Sylabel));
});

///class renderings

// const renderCon = document.querySelector("#renderer");
// const renderer = new render(renderCon);
// renderer.renderer();
// Example usage:
async function main() {
  // const presentation = new Presentation(sample.slides, true);
  // presentation.render();
  // await presentation.renderVisualsAsync(sample.slides[0]);
  document.querySelector(".pass-btn").addEventListener("click", () => {
    if (presentation.speechSynthesis.paused || speechSynthesis.paused) {
      presentation.resume();
      speechSynthesis.resume();
    } else {
      speechSynthesis.pause();
      presentation.pause();
    }
  });
  document.querySelector("#post-slide").addEventListener("click", () => {
    presentation.skipToNext();
  });
  document.querySelector("#pre-slide").addEventListener("click", () => {
    presentation.skipToPrevious();
  });
}

main();
