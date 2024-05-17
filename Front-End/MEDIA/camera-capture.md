# Camera Capture

```typescript
export class CameraCapture {
  @ViewChild('video', { static: false }) video: any;
  @ViewChild('canvas', { static: false }) canvas: any;
  @ViewChild('photo', { static: false }) photo: any;

  constructor() {
    this.init();
  }

  init() {
    setTimeout(() => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream: any) => {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
        })
        .catch((error: any) => {
          console.error('Error', error);
        });
      this.clearphoto();
    }, 1000);
  }

  takePhoto(event: any, userSpeech?: string) {
    event.preventDefault();
    this.takepicture();
  }

  clearphoto() {
    const context = this.canvas.nativeElement.getContext('2d');
    context.fillStyle = '#AAA';
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // const data = this.canvas.nativeElement.toDataURL('image/png');
    // this.service.postImage(data);
  }

  takepicture() {
    const context = this.canvas.nativeElement.getContext('2d');
    if (this.width && this.height) {
      context.drawImage(
        this.video.nativeElement,
        0,
        0,
        this.width,
        this.height
      );

      // const data = this.canvas.nativeElement.toDataURL('image/png');
      // this.service.postImage(data, this.latestTranscript);
    } else {
      this.clearphoto();
    }
  }
}
```