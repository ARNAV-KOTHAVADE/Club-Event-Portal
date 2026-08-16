// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRM3iAffmzak0brr1WKI331iTwYLJ9MD0",
  authDomain: "club-event-portal.firebaseapp.com",
  projectId: "club-event-portal",
  storageBucket: "club-event-portal.firebasestorage.app",
  messagingSenderId: "890339398823",
  appId: "1:890339398823:web:ddb5af10e7cd6a7ff17782",
  measurementId: "G-XRMVKZJXFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);   // created ONE time, right here
export const db = getFirestore(app);
export default app; 
