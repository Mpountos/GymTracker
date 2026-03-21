import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Αντικατάστησε τα παρακάτω με τα δικά σου στοιχεία από το Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBUog_We86YQKGknsGfbdLyImm6x4a1OfM",
  authDomain: "gymtracker-3a6b9.firebaseapp.com",
  projectId: "gymtracker-3a6b9",
  storageBucket: "gymtracker-3a6b9.firebasestorage.app",
  messagingSenderId: "478041849836",
  appId: "1:478041849836:web:4431219f2fb5af3b0b8ac9",
  measurementId: "G-0MBE8QBDVK"
};

// Αρχικοποίηση του Firebase
const app = initializeApp(firebaseConfig);

// Εξαγωγή του Authentication και της Βάσης Δεδομένων για να τα χρησιμοποιήσουμε αλλού
export const auth = getAuth(app);
export const db = getFirestore(app);