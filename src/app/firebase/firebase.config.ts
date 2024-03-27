import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyC04bVHIIppdWtRjsZVIa34L37SiCWzJHE",
  authDomain: "demm-43e75.firebaseapp.com",
  projectId: "demm-43e75",
  storageBucket: "demm-43e75.appspot.com",
  messagingSenderId: "985601658178",
  appId: "1:985601658178:web:b33cdde8ea3039f10c0cdb",
};

const app = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(app);
export const FirebaseDB = getFirestore(app);
