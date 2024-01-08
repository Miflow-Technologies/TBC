import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAJ-vsKxk1UxvWkhZzhEc1fA1-fj0Mskhc",
  authDomain: "thebeaconcentre-40f9a.firebaseapp.com",
  projectId: "thebeaconcentre-40f9a",
  storageBucket: "thebeaconcentre-40f9a.appspot.com",
  messagingSenderId: "646351775954",
  appId: "1:646351775954:web:a12a10385834393552650b",
  measurementId: "G-QTJE0VCJ3G"
};


const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db  = getFirestore(app)
export const storage = getStorage(app)


