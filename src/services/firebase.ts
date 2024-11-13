/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  orderBy,
  deleteDoc,
  getDocs,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

import type { InterviewInputInterface } from 'src/models';

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
  userId: string,
  interviewInput: InterviewInputInterface
): Promise<void> => {
  if (!userId) return;

  await setDoc(
    doc(db, `users/${userId}/interviews`, interviewInput.id),
    interviewInput
  );
};

export const firebaseGetAllInterviews = async (
  userId: string
): Promise<InterviewInputInterface[]> => {
  const requestQuery = query(
    collection(db, `users/${userId}/interviews`),
    orderBy('createdAt', 'desc')
  );

  const response = await getDocs(requestQuery);
  return response.docs.map(doc => doc.data() as InterviewInputInterface);
};

export const getDocumentById = async (
  userId: string,
  docId: string
): Promise<InterviewInputInterface> => {
  const docRef = doc(db, `users/${userId}/interviews`, docId);
  const docSnap = await getDoc(docRef);

  return docSnap.data() as InterviewInputInterface;
};

export const updateInterview = async (
  userId: string,
  interviewId: string,
  interviewInput: InterviewInputInterface
): Promise<void> => {
  const docRef = doc(db, `users/${userId}/interviews`, interviewId);
  await updateDoc(docRef, {
    ...interviewInput,
  });
};

export const firebaseDeleteInterview = async (
  userId: string,
  interviewId: string
): Promise<void> => {
  await deleteDoc(doc(db, `users/${userId}/interviews`, interviewId));
};
