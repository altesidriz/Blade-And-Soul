import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "balde-and-soul-7c14b.firebaseapp.com",
  projectId: "balde-and-soul-7c14b",
  storageBucket: "balde-and-soul-7c14b.appspot.com",
  messagingSenderId: "137988767677",
  appId: "1:137988767677:web:3cbe74cf94a30c96381cd4"
};


const app = initializeApp(firebaseConfig);

export default app;