import { storage } from "./Index";

// src/firebase.js
import { initializeApp } from 'firebase/app';
// import { getStorage } from 'firebase/storage';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// Your web app's Firebase configuration
/**
 * Upload a file to Firebase Storage and return the download URL
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - A promise that resolves to the download URL of the uploaded file
 */
export async function uploadFile(file) {
    if (!file) throw new Error("No file provided for upload");
  
    const storageRef = ref(storage, `files/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    
    return downloadUrl;
  }
/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEo57bQ5iocvksfMLWkiGRiHaKiWfnrpg",
  authDomain: "messangergpt.firebaseapp.com",
  databaseURL: "https://messangergpt-default-rtdb.firebaseio.com",
  projectId: "messangergpt",
  storageBucket: "messangergpt.appspot.com",
  messagingSenderId: "1079401094909",
  appId: "1:1079401094909:web:a5f4278b47516512e22894",
  measurementId: "G-NQ0CGDQW0P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);*/