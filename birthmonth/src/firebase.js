// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase, { initializeApp } from 'firebase';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBG_SMJTsc2RkYXndihFvYl1UE4H1flfYk",
//     authDomain: "challenge-fe225.firebaseapp.com",
//     projectId: "challenge-fe225",
//     storageBucket: "challenge-fe225.appspot.com",
//     messagingSenderId: "153325481831",
//     appId: "1:153325481831:web:e05c941f86b8791dab89c2",
//     measurementId: "G-KX00HMLT9Q"
//   };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ37HjRyg9_Hhpv7P7utyT7fhjwQyhzgc",
  authDomain: "challenge-93541.firebaseapp.com",
  projectId: "challenge-93541",
  storageBucket: "challenge-93541.appspot.com",
  messagingSenderId: "443433422254",
  appId: "1:443433422254:web:f8d9c02fb643a150444c3f",
  measurementId: "G-8GK2Z56TV2"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);



  const db = firebaseApp.firestore();

  const auth = firebase.auth();
 

  export {db, auth};