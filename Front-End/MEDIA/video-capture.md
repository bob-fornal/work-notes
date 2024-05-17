# Video Capture

```typescript
export class VideoCaptureComponent implements OnInit {
  @ViewChild('preview', { static: false }) preview: any;

  recorder: any;
  stream: any;
  data: Array<any> = [];

  constructor() {
    this.init();
  }

  init() {
    setTimeout(() => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream: any) => {
          this.stream = stream;
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
        })
        .catch((error: any) => {
          console.error('Error', error);
        });
    }, 1000);
  }

  record() {
    this.recorder = new MediaRecorder(this.stream);
    this.recorder.ondataavailable = (event: any) => {
      this.data.push(event.data);
    };
    this.recorder.start();
  }

  stop() {
    if (this.recorder.state === 'recording') {
      this.recorder.stop();
      this.stream.getTracks().forEach((track: any) => track.stop());

      setTimeout(()=> {
        let recordedBlob = new Blob(this.data, { type: "video/webm" });
        console.log(recordedBlob);

        const track = this.stream.getVideoTracks()[0];
        let imageCapture = new ImageCapture(track);

        this.init();
      }, 2000);
    }
  }
}
```