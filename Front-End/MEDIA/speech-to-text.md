# Speech To Text (Browser)

```typescript
startSpeechRegonition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    // Keep listening after the user pauses speaking
    // Language for recognition
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const lastResultIndex = event.results.length - 1;
      const transcript = event.results[lastResultIndex][0].transcript.trim();

      if (transcript.toLowerCase().includes(this.triggerWord.toLowerCase())) {
        this.latestTranscript = transcript;
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
    };

    recognition.onend = () => {
      // Automatically restart the recognition when it ends
      recognition.start();
    };

    // Start speech recognition when the script loads
    recognition.start();
  } else {
    console.error('SpeechRecognition is not available in this browser.');
  }
}
```