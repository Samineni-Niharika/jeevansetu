import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbS90B6-SI82K061ABLoKqybC-LeHJqpg",
  authDomain: "waterbornedisease2027.firebaseapp.com",
  projectId: "waterbornedisease2027",
  storageBucket: "waterbornedisease2027.firebasestorage.app",
  messagingSenderId: "85088438401",
  appId: "1:85088438401:web:97fd130aa09c029187e580",
  measurementId: "G-BLQ5D5EM6D"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
