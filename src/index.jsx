import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";

const firebaseapp = initializeApp({

});
const auth = getAuth(firebaseapp);
const db = getFirestore(firebaseapp);
const todosCol = collection(db, 'todos');
const snapshot = await getDocs(todosCol);

auth.onAuthStateChanged(user =>{
    if(user != null){
        console.log('logged in');
    } else {
        console.log('no user');
    }
})