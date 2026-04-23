import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const firestoreDatabaseId = process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_DATABASE_ID;
export const db = firestoreDatabaseId
  ? getFirestore(app, firestoreDatabaseId)
  : getFirestore(app);
export const auth = getAuth(app);
