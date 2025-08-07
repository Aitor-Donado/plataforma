// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDIidpNkLPMK5qRspSfpEVJPps4fLwgw0",
  authDomain: "aitor-donado.firebaseapp.com",
  projectId: "aitor-donado",
  storageBucket: "aitor-donado.firebasestorage.app",
  messagingSenderId: "925105958084",
  appId: "1:925105958084:web:65ffe1c3396316b9cd6d91",
  measurementId: "G-N7Z62N527H",
};

let app;
let auth;
let db;
let analytics;

if (typeof window !== "undefined") {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics };
