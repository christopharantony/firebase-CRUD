import { query, orderBy, addDoc, collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './App.css';
import { db } from './firebase/config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

function App() {
  const auth = getAuth();

  const q = query(collection(db, 'users'))
  onSnapshot(q, (querySnapshot) => {
    querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })).forEach(doc => console.log(doc))
  })
  return (
    <div className="App">
      <button onClick={async (e) => {
        e.preventDefault();
        try {
          await addDoc(collection(db, 'users'), { name: 'John', age: 30 })
          onclose();
        } catch (error) {
          console.log(error);
        }
      }
      }
      >Add me</button>

      <button onClick={() => {
        query(collection(db, 'users'), orderBy('name', 'asc'))
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })).forEach(doc => console.log(doc))
        })
      }} >Show All</button>

      <button onClick={async (e) => {
        e.preventDefault();
        const taskDocRef = doc(db, 'users', 'EkJ4Ag2cTNSTqmcbVjio')
        try {
          await updateDoc(taskDocRef, { name: 'Johny', age: 35 })
          onclose()
        } catch (error) {
          console.log(error);
        }
      }} >Update me</button>

      <button onClick={async () => {
        const taskDocRef = doc(db, 'users', 'jtfD95qBg6Z3bwhPH9lx')
        try {
          await deleteDoc(taskDocRef)
          onclose()
        } catch (error) {
          console.log(error);
        }
      }} >Delete me</button>

      <button onClick={()=>{
        createUserWithEmailAndPassword(auth, process.env.REACT_APP_EMAIL, process.env.REACT_APP_PASSWORD)
        .then((userCredential) => {
          
          const user = userCredential.user;
          console.log('Account Added ', user.email);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        })
      }}>Sign up</button>

      <button onClick={()=>{
        signInWithEmailAndPassword(auth, 'christopharantony@gmail.com', '12345678')
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Logged In ', user.email);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
      }}>Sign in</button>

      <button onClick={()=>{
        signOut(auth)
        .then(() => {
          console.log('Logged out');
        }).catch((error) => {
          console.log(error.message);
        }
        )
      }}>Sign out</button>

    </div>
  );
}

export default App;
