// Emotion detection module
const initEmotionDetection = async () => {
  const video = document.getElementById('emotion-video');
  const resultEl = document.getElementById('emotion-result');
  const confidenceEl = document.getElementById('confidence');

  try {
    // Load face-api.js dynamically if not already loaded
    if (!window.faceapi) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js';
      document.head.appendChild(script);
      await new Promise(resolve => script.onload = resolve);
    }

    // Load models
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('https://justadudewhohacks.github.io/face-api.js/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('https://justadudewhohacks.github.io/face-api.js/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('https://justadudewhohacks.github.io/face-api.js/models')
    ]);

    // Start camera
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    // Detection loop
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, 
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceExpressions();

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        const dominant = Object.entries(expressions).reduce((a, b) => 
          a[1] > b[1] ? a : b
        );
        
        const emotionMap = {
          neutral: "😐 Neutral",
          happy: "😊 Happy",
          sad: "😢 Sad", 
          angry: "😠 Angry",
          fearful: "😨 Anxious",
          disgusted: "🤢 Disgusted",
          surprised: "😲 Surprised"
        };
        
        resultEl.textContent = emotionMap[dominant[0]] || dominant[0];
        confidenceEl.textContent = `${Math.round(dominant[1] * 100)}% confidence`;
      }
    }, 500);

  } catch (err) {
    resultEl.textContent = "Emotion detection unavailable";
    console.error("Emotion detection error:", err);
  }
};

// Initialize when your page is ready
window.addEventListener('DOMContentLoaded', initEmotionDetection);