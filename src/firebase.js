import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBZGl0KtrsK-yENnL1UsAihsYZqSnudHPM",
    authDomain: "vishal-hotel.firebaseapp.com",
    projectId: "vishal-hotel",
    storageBucket: "vishal-hotel.firebasestorage.app",
    messagingSenderId: "960043799177",
    appId: "1:960043799177:web:7f205979e7f3851a17ec58",
    measurementId: "G-X5R7BPRYPG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);