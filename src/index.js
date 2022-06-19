import { initializeApp } from "firebase/app"
import {
  getFirestore, collection, getDocs
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA9SnRKqE57JVUNAXvVObRGlhGSl1Lml7w",
  authDomain: "fir-test-b5d41.firebaseapp.com",
  projectId: "fir-test-b5d41",
  storageBucket: "fir-test-b5d41.appspot.com",
  messagingSenderId: "1033072082298",
  appId: "1:1033072082298:web:ea66ec2288205f117caac3"
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "books");

getDocs(colRef) 
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
    
  })
  .catch(err => {
    console.log(err.message);
  })