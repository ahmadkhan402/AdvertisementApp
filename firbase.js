
import { initializeApp, firebase} from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDqtUN79ZU0kTH3LMfXS2xDdvgYB8tPCxM",
    authDomain: "advertisementapp-ada16.firebaseapp.com",
    projectId: "advertisementapp-ada16",
    storageBucket: "advertisementapp-ada16.appspot.com",
    messagingSenderId: "783720543225",
    appId: "1:783720543225:web:2cf2d81bc1fb0101290328"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);


export { auth };
export { storage };
export { db };
