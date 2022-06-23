import { initializeApp } from "firebase/app"
import {
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, 
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

// Collection Ref
const colRef = collection(db, "books");

// Queries
// const q = query (colRef, where("author", "==", "Richard Dawkins"))
const q = query (colRef, orderBy("title", "asc"))

// Get Realtime Data Collection
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  // console.log(books[0].title);
  let items = "";
  for (let i = 0; i < books.length; i++) {
    items += `<tr><th scope="row" class="tr book-title">` + books[i].title + `</th>`+
    `<td class="tr">` + books[i].author + `</td>` +
    `<td>
    <a href="#" class="edit-item">Edit</a>
    </td></tr>`;
    console.log(books[i].title + " - " + books[i].author + " | " + books[i].id);
  }
  let bookList = document.getElementById("bookList");
  bookList.innerHTML = items;
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
