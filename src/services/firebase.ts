// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUz4n89a3opaVmE79GPZrQAWQdkzzddZo",
  authDomain: "soundcheck-c13cb.firebaseapp.com",
  projectId: "soundcheck-c13cb",
  storageBucket: "soundcheck-c13cb.appspot.com",
  messagingSenderId: "908141631899",
  appId: "1:908141631899:web:373b9324943917b0f2a93e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
