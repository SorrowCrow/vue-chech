import firebase from "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBkeiBsSr0D2tDAuSahlCKMa2PSDQalIN8",
    authDomain: "light-client-299412.firebaseapp.com",
    databaseURL: "https://light-client-299412-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "light-client-299412",
    storageBucket: "light-client-299412.appspot.com",
    messagingSenderId: "568751755748",
    appId: "1:568751755748:web:10c01d1a9cbe30ffe5f7f1"
});

const db = firebaseApp.firestore();

export { db };
