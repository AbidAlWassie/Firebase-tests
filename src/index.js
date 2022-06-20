import { initializeApp } from "firebase/app"
import {
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, query, where
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
// Collection Ref
const db = getFirestore();

const colRef = collection(db, "books");

// Get Realtime Data Collection
// getDocs(colRef).then((snapshot) => {
//   let books = [];
//   snapshot.docs.forEach((doc) => {
//     books.push({ ...doc.data(), id: doc.id })
//   })
//   console.log(books);
  
// }).catch(err => {
//   console.log(err.message);
// })

onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books);
})


const addBookForm = document.querySelector(".add")
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })

})

const deleteBookForm = document.querySelector(".delete")
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value)

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset()
  })
})
