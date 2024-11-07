import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCATNbMVvKzRHjDlxn4OudsutYQezHl9z0",
  authDomain: "finance-track03.firebaseapp.com",
  projectId: "finance-track03",
  storageBucket: "finance-track03.firebasestorage.app",
  messagingSenderId: "449093722183",
  appId: "1:449093722183:web:7fcb327ab4a47f81e5d162"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);