import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyB_edZ08pZsZwvuEt9yVWAvOXMwv7Q0uqA",
  authDomain: "newsproject-78661.firebaseapp.com",
  projectId: "newsproject-78661",
  storageBucket: "newsproject-78661.appspot.com",
  messagingSenderId: "559930886440",
  appId: "1:559930886440:web:e17195fc0ba9a727bd281d",
  measurementId: "G-7QELGXXVJ7"

};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app)

