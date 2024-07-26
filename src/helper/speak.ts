export const speakNow = (term: string) => {
  if (typeof window !== "undefined") {
    const synth = window.speechSynthesis;

    let voice = new SpeechSynthesisUtterance(term);
    voice.lang = "id-ID";
    synth.speak(voice);
  }
};
