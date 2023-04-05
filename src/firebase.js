import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 


const firebaseConfig = {
    apiKey: "AIzaSyAKo-BK53YrLY3pg7XcmKqaXsgN64_D74c",
    authDomain: "food-delivery-app-b4fc2.firebaseapp.com",
    databaseURL: "https://food-delivery-app-b4fc2-default-rtdb.firebaseio.com",
    projectId: "food-delivery-app-b4fc2",
    storageBucket: "food-delivery-app-b4fc2.appspot.com",
    messagingSenderId: "139496503576",
    appId: "1:139496503576:web:a1841231dfc6660ec6866d"
  };
  
// Initialize Firebase


export const app = getApps.length > 0 ? getApps() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };

/*
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();*/