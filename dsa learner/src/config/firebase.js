import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace these with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ-rgI9JYrS1Uxbw44b8b1_y2mpygjQB8",
  authDomain: "dsa-leaner.firebaseapp.com",
  projectId: "dsa-leaner",
  storageBucket: "dsa-leaner.firebasestorage.app",
  messagingSenderId: "352082174674",
  appId: "1:352082174674:web:f2288988ed9a25159c830b",
  measurementId: "G-W16YKYKR62"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
