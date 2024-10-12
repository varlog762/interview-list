/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore';

import { InterviewInputInterface } from 'src/models';

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
const db = getFirestore();

export const firebaseSignUp = (
  email: string,
  password: string
): Promise<UserCredential> => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

export const firebaseSignIn = (
  email: string,
  password: string
): Promise<UserCredential> => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const firebaseSignOut = () => {
  const auth = getAuth();
  signOut(auth);
};

export const createInterview = async (
  interviewInput: InterviewInputInterface
): Promise<void> => {
  // const userId = 'FMKw5wsQyCWKkAPvBbiQd1XP6Kk2';
  const userId = getAuth().currentUser?.uid;

  if (!userId) return;
  console.log(userId);

  await setDoc(
    doc(db, `users/${userId}/interviews`, interviewInput.id),
    interviewInput
  );
};
