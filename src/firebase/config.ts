import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXGl8DBhc9q3VPJ54xan9in-oWP3g3slQ",
  authDomain: "diftrash-5fe44.firebaseapp.com",
  projectId: "diftrash-5fe44",
  storageBucket: "diftrash-5fe44.firebasestorage.app",
  messagingSenderId: "674522603128",
  appId: "1:674522603128:web:a9f99e20930c09c880d78d",
  measurementId: "G-GYY7PT2HMC",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
