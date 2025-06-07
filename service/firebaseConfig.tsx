import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtWjgCvRpNPewAndrUQ14FmHAiXqch3m4",
    authDomain: "breez-937d3.firebaseapp.com",
    projectId: "breez-937d3",
    storageBucket: "breez-937d3.firebasestorage.app",
    messagingSenderId: "478448992357",
    appId: "1:478448992357:web:cf698c60874e442c90068c"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)
  export const db = getFirestore(app)