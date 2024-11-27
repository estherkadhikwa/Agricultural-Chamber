// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBhTjz4Rq9K-DIckaKC-KuHtMrX7ENPC3A",
    authDomain: "agrichamber-b4c68.firebaseapp.com",
    projectId: "agrichamber-b4c68",
    storageBucket: "agrichamber-b4c68.firebasestorage.app",
    messagingSenderId: "400333526643",
    appId: "1:400333526643:web:e9dd766ad2ee294346fc06",
    measurementId: "G-2HC71SF4PH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
