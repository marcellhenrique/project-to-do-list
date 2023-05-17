import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCp-fa-j4TeRBpUYsnnJFfRDa5EpZ1qn_4",
  authDomain: "curso-bf57b.firebaseapp.com",
  projectId: "curso-bf57b",
  storageBucket: "curso-bf57b.appspot.com",
  messagingSenderId: "3305922428",
  appId: "1:3305922428:web:45dbad6828477657cb4ef9",
  measurementId: "G-DBY6NSP75E"
};

const FirebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(FirebaseApp)
const auth = getAuth(FirebaseApp)

export {db, auth};