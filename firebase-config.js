// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const realDb = getDatabase(app);

export const getPathStorageFromUrl = (url) => {
  const baseUrl = process.env.NEXT_PUBLIC_STORAGE_BASE_URL;
  let imagePath = url.replace(baseUrl,"");
  const indexOfEndPath = imagePath.indexOf("?");
  imagePath = imagePath.substring(0,indexOfEndPath);
  imagePath = imagePath.replace(/%2F/g,"/");
  imagePath = imagePath.replace(/%20/g," ");
  return imagePath;
}

export const getFileNameFromUrl = (url) => {
  const lastIndex = url.lastIndexOf('%2F')
  const after = url.slice(lastIndex + 3)
  const fileName = after.split(".")[0]
  return fileName;
}