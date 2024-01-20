import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDStCpzz_1v1bghVM1102qq-KN1L2FiuVk",

  authDomain: "chat-7bfc6.firebaseapp.com",

  projectId: "chat-7bfc6",

  storageBucket: "chat-7bfc6.appspot.com",

  messagingSenderId: "222793946493",

  appId: "1:222793946493:web:3ccc75857eba9d17496814",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();