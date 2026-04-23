import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Prevent re-initialization in Next.js dev mode (hot reload)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const cfg = firebaseConfig as { firestoreDatabaseId?: string };
export const db = cfg.firestoreDatabaseId
  ? getFirestore(app, cfg.firestoreDatabaseId)
  : getFirestore(app);
export const auth = getAuth(app);
