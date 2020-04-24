import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAbgSmwrs9QmM1y86cPnOVWQ8Kh4dxvmKA",
  authDomain: "coursera-meditation-db.firebaseapp.com",
  databaseURL: "https://coursera-meditation-db.firebaseio.com",
  projectId: "coursera-meditation-db",
  storageBucket: "coursera-meditation-db.appspot.com",
  messagingSenderId: "345235119974",
  appId: "1:345235119974:web:7cb747be2ce011012d72a7",
  measurementId: "G-0YTYWZMEXD",
};

export default firebase.initializeApp(firebaseConfig);
