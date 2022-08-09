
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, initializeAuth }from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCj7giU0eofZFkEstVrZHGcI49SWWIpk6Q",
  authDomain: "rankin-os-login.firebaseapp.com",
  projectId: "rankin-os-login",
  storageBucket: "rankin-os-login.appspot.com",
  messagingSenderId: "785749568125",
  appId: "1:785749568125:web:40a257e017983359459f14"
};

export const fireApp = initializeApp(firebaseConfig);
export const fireAuth = initializeAuth(fireApp,{persistence: browserLocalPersistence});