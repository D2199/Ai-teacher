export const settings = {
  source: "Cohere",
  ApiKey: "39c6b7ifZgKuyydjmgs6bs0kNJlKR0t8ZHAqpRmN",

  ApiEndpoint: "https://api.cohere.com/v1/chat",
  AutoPlay: true,
  TextAnimation: "feadin",
  TextAnimationOptions: ["feadin"],
  voice: {
    rate: 0.7,
    pitch: 1,
    voice: speechSynthesis.getVoices()[9359],
    lang: "en-GB",
  },
};
localStorage.setItem("settings", JSON.stringify(settings));
