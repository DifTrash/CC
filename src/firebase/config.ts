import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Storage } from "@google-cloud/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXGl8DBhc9q3VPJ54xan9in-oWP3g3slQ",
  authDomain: "diftrash-5fe44.firebaseapp.com",
  projectId: "diftrash-5fe44",
  storageBucket: "diftrash-5fe44.appspot.com",
  messagingSenderId: "674522603128",
  appId: "1:674522603128:web:a9f99e20930c09c880d78d",
  measurementId: "G-GYY7PT2HMC",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const storage = new Storage({
  projectId: "diftrash",
  keyFilename: `${__dirname}/env.json`,
});

const bucket = storage.bucket("diftrash_modell");

export { db, auth, bucket };
