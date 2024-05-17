# Text To Speech (Browser)

```typescript
export class TextToSpeechService {
  voice: any;
  pitch: number = 1; // 0-2, by 0.1
  rate: number = 1; // 0-3, by 0.1

  voices: Array<any> = [];

  active: boolean = true;

  constructor() {
    this.initService();
  }

  async initService() {
    this.voices = await this.getVoices();
    this.voice = this.voices[0];
  }

  speak(text = 'This is sample text, by Bob.') {
    const synth = window.speechSynthesis;
    synth.cancel();

    if (this.active === false) return;

    const utter = new SpeechSynthesisUtterance(text);

    this.voice = this.voices[0];
    utter.voice = this.voice;
    utter.pitch = this.pitch;
    utter.rate = this.rate;
    utter.volume = 0.8;

    synth.speak(utter);
  }

  getVoices(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      let synth = window.speechSynthesis;
      let id = setInterval(() => {
        if (synth.getVoices().length !== 0) {
          resolve(synth.getVoices());
          clearInterval(id);
        }
      }, 10);
    });
  }

  getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
```