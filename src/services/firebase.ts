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

/**
 * Signs up a new user with the given email and password. If the user is
 * created successfully, the Promise resolves with a UserCredential object.
 * @param email The email address for the new user.
 * @param password The password for the new user.
 * @returns A Promise that resolves with a UserCredential object if the
 *          sign-up operation is successful.
 */
export const firebaseSignUp = (
  email: string,
  password: string
): Promise<UserCredential> => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Signs in a user with the given email and password. If the sign-in
 * operation is successful, the Promise resolves with a UserCredential
 * object.
 * @param email The email address of the user.
 * @param password The password of the user.
 * @returns A Promise that resolves with a UserCredential object if the
 *          sign-in operation is successful.
 */
export const firebaseSignIn = (
  email: string,
  password: string
): Promise<UserCredential> => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Signs out the current user.
 */
export const firebaseSignOut = () => {
  const auth = getAuth();
  signOut(auth);
};

/**
 * Creates a new interview document in the Firestore database.
 * @param userId The ID of the user.
 * @param interviewInput The interview document to be created.
 * @returns A Promise that resolves when the document is created.
 */
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

/**
 * Retrieves all interviews for the given user from Firestore.
 * The interviews are retrieved in descending order of creation time.
 * @param userId The ID of the user.
 * @returns A Promise that resolves with an array of InterviewInputInterface objects.
 */
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

/**
 * Retrieves a specific interview document by its ID from Firestore.
 * @param userId The ID of the user.
 * @param docId The ID of the document to retrieve.
 * @returns A Promise that resolves with the specified InterviewInputInterface object.
 */
export const getDocumentById = async (
  userId: string,
  docId: string
): Promise<InterviewInputInterface> => {
  const docRef = doc(db, `users/${userId}/interviews`, docId);
  const docSnap = await getDoc(docRef);

  return docSnap.data() as InterviewInputInterface;
};

/**
 * Updates a specific interview document by its ID in Firestore.
 * The interview is updated with the fields from the provided InterviewInputInterface object.
 * @param userId The ID of the user.
 * @param interviewId The ID of the document to update.
 * @param interviewInput The InterviewInputInterface object with the updated fields.
 * @returns A Promise that resolves when the update is done.
 */
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

/**
 * Deletes a specific interview document by its ID from Firestore.
 * @param userId The ID of the user.
 * @param interviewId The ID of the document to delete.
 * @returns A Promise that resolves when the deletion is done.
 */
export const firebaseDeleteInterview = async (
  userId: string,
  interviewId: string
): Promise<void> => {
  await deleteDoc(doc(db, `users/${userId}/interviews`, interviewId));
};
