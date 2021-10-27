import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBBl9DtN99NjecCq0hP4XNYlqeehHOEADM",
  authDomain: "clone-e404b.firebaseapp.com",
  projectId: "clone-e404b",
  storageBucket: "clone-e404b.appspot.com",
  messagingSenderId: "321913396074",
  appId: "1:321913396074:web:fa654592b2cc15a305e313"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };