/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: 'interview-list-c46d3.firebaseapp.com',
  projectId: 'interview-list-c46d3',
  storageBucket: 'interview-list-c46d3.appspot.com',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: '',
};

const app = initializeApp(firebaseConfig);
