import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSnEY2yW-cZIsX6dDwj_qqIxzSfnXNHBI",
  authDomain: "gun-chat-app.firebaseapp.com",
  projectId: "gun-chat-app",
  storageBucket: "gun-chat-app.appspot.com",
  messagingSenderId: "33360943812",
  appId: "1:33360943812:web:1091b99cb26c1a39a68791"
}
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
