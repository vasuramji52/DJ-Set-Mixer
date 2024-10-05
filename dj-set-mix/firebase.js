import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCGT8mVQNufIxpR_xyS48USwuK_u_BK80U",
    authDomain: "pipravi-xx.firebaseapp.com",
    projectId: "pipravi-xx",
    storageBucket: "pipravi-xx.appspot.com",
    messagingSenderId: "1037703258011",
    appId: "1:1037703258011:web:8fc9382655d03a7fadcb3e"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;