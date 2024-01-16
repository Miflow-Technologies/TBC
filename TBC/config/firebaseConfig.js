import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAJ-vsKxk1UxvWkhZzhEc1fA1-fj0Mskhc",
  authDomain: "thebeaconcentre-40f9a.firebaseapp.com",
  projectId: "thebeaconcentre-40f9a",
  storageBucket: "thebeaconcentre-40f9a.appspot.com",
  messagingSenderId: "646351775954",
  appId: "1:646351775954:web:a12a10385834393552650b",
  measurementId: "G-QTJE0VCJ3G"
};


export const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app)
export const storage = getStorage(app)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


