/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'interview-list-c46d3.firebaseapp.com',
  projectId: 'interview-list-c46d3',
  storageBucket: 'interview-list-c46d3.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MESUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const firebaseSignUp = async (email: string, password: string) =>
  await createUserWithEmailAndPassword(auth, email, password);

export const firebaseSignIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);

export const firebaseSignOut = async () => await signOut(auth);
