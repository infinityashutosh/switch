let desktopStream;
const video = document.getElementById('desktopVideo');

const captureDesktopButton = document.getElementById('captureDesktop');
const stopCaptureButton = document.getElementById('stopCapture');

captureDesktopButton.addEventListener('click', captureDesktop);
stopCaptureButton.addEventListener('click', stopCapture);

function captureDesktop() {
  chrome.desktopCapture.chooseDesktopMedia(
    ['screen', 'window'],
    (streamId) => {
      if (streamId) {
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: streamId,
            },
          },
        })
        .then((stream) => {
          desktopStream = stream;
          video.srcObject = stream;
          captureDesktopButton.disabled = true;
          stopCaptureButton.disabled = false;
        })
        .catch((error) => {
          console.error('Error capturing desktop stream:', error);
        });
      } else {
        console.error('User canceled desktop capture.');
      }
    }
  );
}

function stopCapture() {
  if (desktopStream) {
    desktopStream.getTracks().forEach((track) => track.stop());
    desktopStream = null;
    video.srcObject = null;
    captureDesktopButton.disabled = false;
    stopCaptureButton.disabled = true;
  }
}