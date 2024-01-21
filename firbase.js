// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB80SoDmSZFezZnYHzgbmW7sKwPpx4hcEk",
  authDomain: "advertisementapp-f938f.firebaseapp.com",
  projectId: "advertisementapp-f938f",
  storageBucket: "advertisementapp-f938f.appspot.com",
  messagingSenderId: "671419057202",
  appId: "1:671419057202:web:96dd06f49eed3906d7a82b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const storage = getStorage(app)
const db = getFirestore(app);
export {auth}
export {db}
export {storage}