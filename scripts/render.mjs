import { sample } from "./sampls.mjs";
import { Tools } from "./Tools.mjs";

// function speech(text) {
//   const speech = new SpeechSynthesisUtterance(text);
//   speech.rate = 0.7;
//   speech.lang = "en-GB";
//   speech.pitch = 1;
//   speech.voice = speechSynthesis.getVoices()[9359];
//   let i = 0;
//   speech.onend = (e) => {
//     console.log(e);
//   };
//   // for (let v of speechSynthesis.getVoices()) {
//   //   if ("en" in v) {
//   //     console.log(i, v.lang);
//   //   }
//   //   i++;
//   // }
//   // console.log(speechSynthesis.getVoices()[9].lang);
//   console.log(speechSynthesis.speak(speech));
//   return speech;
// }
export class render {
  constructor(constainer) {
    this.constainer = constainer;
    this.renderQue = [...sample.slides];
    this.currentSlideIndex = 0;
    this.pause = false;
  }
  getSlide(index) {
    return this.renderQue[index];
  }
  previous() {
    if (
      this.currentSlideIndex < this.renderQue.length &&
      this.currentSlideIndex > 0
    ) {
      this.currentSlideIndex--;
      return this.renderQue[this.currentSlideIndex];
    }
  }
  // pause(bool) {
  //   this.pauseBl = bool;
  // }
  next() {
    if (
      this.currentSlideIndex < this.renderQue.length &&
      this.currentSlideIndex > 0
    ) {
      this.currentSlideIndex++;
      return this.renderQue[this.currentSlideIndex];
    }
  }
  renderer() {
    // this.constainer += JSON.stringify(this.renderQue[this.currentSlideIndex]);
    // return this.constainer;

    for (let slide of this.renderQue) {
      if (!this.pause) {
        this.constainer.innerHTML += slide;
      }
    }
  }
}

// const TestRender = new render("");
// TestRender.next();
// console.log(TestRender.renderer());

export class Presentation {
  constructor(playAll = false) {
    // this.slides = slides;
    this.playAll = playAll;
    this.currentSlideIndex = 0;
    this.renderer = document.querySelector("#renderer");
    this.narrationElement = document.querySelector("#caption");
    this.speechSynthesis = window.speechSynthesis;
    this.rendering = false;
    this.slides = [];
    // this.renderer.appendChild(this.narrationElement);
  }

  async renderVisualsAsync(slide) {
    console.log(this.currentSlideIndex);
    this.renderer.innerHTML = "";
    this.speechSynthesis.cancel();
    this.rendering = true;
    // console.log(this.rendering);
    for (const [visualKey, visualValue] of Object.entries(slide.visuals)) {
      for (const [propertyKey, propertyValue] of Object.entries(visualValue)) {
        const element = await Tools[propertyKey](propertyValue);
        // console.log(element);
        this.renderer.appendChild(element);
      }
    }

    this.setCaption(slide.narration);
    this.speech = this.playNarration(slide.narration);
    this.speechSynthesis.speak(this.speech);
    await new Promise((resolve) => {
      this.speech.onend = resolve;
    });
    this.rendering = false;
    // console.log(this.rendering);
    // await this.playNarration(slide.narration);
  }
  async renderAllVisualsAsync(currentSlideIndex = 0) {
    this.renderer.innerHTML = "";
    this.speechSynthesis.cancel();
    this.rendering = true;
    let slide = this.slides[this.currentSlideIndex];
    console.log(slide, this.slides);
    // console.log(this.rendering);
    for (const [visualKey, visualValue] of Object.entries(slide.visuals)) {
      for (const [propertyKey, propertyValue] of Object.entries(visualValue)) {
        const element = await Tools[propertyKey](propertyValue);
        console.log(element);
        this.renderer.appendChild(element);
      }
    }

    this.setCaption(slide.narration);
    this.speech = this.playNarration(slide.narration);
    this.speechSynthesis.speak(this.speech);
    await new Promise((resolve) => {
      this.speech.onend = resolve;
    });
    this.rendering = false;
    if (this.playAll) {
      this.skipToNext();
    }
  }
  setCaption(narration) {
    this.narrationElement.textContent = narration;
  }
  playNarration(narration) {
    const speech = new SpeechSynthesisUtterance(narration);
    speech.rate = 0.7;
    speech.pitch = 1;
    // await this.playNarration(slide.narration);

    speech.voice = speechSynthesis.getVoices()[9359];
    speech.lang = "en-GB";
    let i = 0;
    return speech;
    this.speech.onend = (e) => {
      // this.currentSlideIndex++;
      // // console.log(e);
      // if (this.currentSlideIndex < this.slides.length) {
      //   this.renderVisualsAsync(this.slides[this.currentSlideIndex]);
      // }
    };

    this.speechSynthesis.speak(this.speech);
  }

  pause() {
    // const narrationSpeech = speech(this.narrationElement.textContent);
    this.speechSynthesis.pause(this.speech);
    // console.log(this.speechSynthesis);
  }
  resume() {
    this.speechSynthesis.resume(this.speech);
  }

  skipToNext() {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex++;
      this.renderAllVisualsAsync(this.slides[this.currentSlideIndex]);
    }
  }

  skipToPrevious() {
    if (this.currentSlideIndex > 0) {
      // console.log(this.currentSlideIndex);
      this.currentSlideIndex--;
      this.renderVisualsAsync(this.slides[this.currentSlideIndex]);
    }
  }
  async render(slides) {
    this.slides = slides;

    // await this.renderVisualsAsync(this.slides[this.currentSlideIndex]);
    if (this.playAll) {
      // for (let i of this.slides) {
      //   this.skipToNext();
      // }

      for (const slide of this.slides) {
        await this.renderVisualsAsync(slide);
        console.log(slides);
      }
      // this.skipToNext();
    } else {
      await this.renderVisualsAsync(this.slides[this.currentSlideIndex]);
    }
  }
}
