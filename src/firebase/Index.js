// src/firebase.js
import { initializeApp } from 'firebase/app';
// import { getStorage } from 'firebase/storage';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfuuosNmoiYzl1WanznEgWDqiqlMFZRU8",
    authDomain: "edtech-project-db99e.firebaseapp.com",
    projectId: "edtech-project-db99e",
    storageBucket: "edtech-project-db99e.appspot.com",
    messagingSenderId: "1063002940092",
    appId: "1:1063002940092:web:26be0e947c0976718026b9",
    measurementId: "G-QC18WTR0GT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
