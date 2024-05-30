document.getElementById('startStream').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startStream' });
  });
  
  document.getElementById('stopStream').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stopStream' });
  });
  
  chrome.runtime.onMessage.addListener(message => {
    if (message.action === 'streamStarted') {
      document.getElementById('startStream').disabled = true;
      document.getElementById('stopStream').disabled = false;
    } else if (message.action === 'streamStopped') {
      document.getElementById('startStream').disabled = false;
      document.getElementById('stopStream').disabled = true;
    }
  });