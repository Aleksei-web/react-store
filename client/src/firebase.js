import firebase from 'firebase';
import 'firebase/auth';

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBipHRrWbSUt1sY68jPqTkjYMwUTG8A1es",
    authDomain: "store-45304.firebaseapp.com",
    databaseURL: "https://store-45304.firebaseio.com",
    projectId: "store-45304",
    storageBucket: "store-45304.appspot.com",
    messagingSenderId: "943879346250",
    appId: "1:943879346250:web:71f2a4ef10b23d97d76eb3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

	console.log('>>>>',firebase);

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
