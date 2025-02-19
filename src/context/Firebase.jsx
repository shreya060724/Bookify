import { createContext,useContext , useState, useEffect } from "react";
import {initializeApp} from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, collection, addDoc , getDocs, doc , getDoc , query, where} from 'firebase/firestore';

//creating a context
const FirebaseContext = createContext(null);

//our default firebase config
//Enter your own firebase Config here

//creating a custom hook to access this context
export const useFirebase = () => useContext(FirebaseContext);

//creating our firebase app = this connected our firebase with react
const FirebaseApp = initializeApp(firebaseConfig);

//creating auth instance for google login
const googleProvider = new GoogleAuthProvider();

//fn to create account using email and pswd = intitialize the auth instance
const firebaseAuth = getAuth(FirebaseApp);

//creating a firestore instance
const firestore = getFirestore(FirebaseApp);

//creating a firebase provider
export const FirebaseProvider = (props) =>{

  const [user , setUser]=useState(null);

  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(user)=>{
      if(user) setUser(user);
      else setUser(null);
    })
  },[])

  const signupUserWithEmailAndPassword = (email, password) =>{
     return createUserWithEmailAndPassword(firebaseAuth, email, password)
  }

  const signinUserWithEmailAndPassword = (email, password) =>{
    return signInWithEmailAndPassword(firebaseAuth, email, password)
 }

 const signinWithGoogle = () =>{
  signInWithPopup( firebaseAuth,googleProvider);
 }

 const handleCreateNewListing = async (name, isbn , price)=>{
   return await addDoc(collection(firestore, 'books'),{
    name, isbn , price,
    userId: user.uid,
    userEmail : user.email,
    displayName: user.displayName,

  })
 }

 //fn to list books in home page
 const listAllBooks = () =>{
  return getDocs(collection(firestore, 'books'))
 }

 //fn to fetch book details
 const getBookById = async (id) =>{
  //creating ref of the doc that has id in db
  const docRef= doc(firestore, 'books', id);
  const result = await getDoc(docRef);
  return result;
 }

 //fn to place book order
 const placeOrder = async (bookId, qty) =>{
  const collectionRef = collection( firestore,'books', bookId, 'orders');
  const result = await addDoc(collectionRef, {
    displayName: user.displayName,
    userId: user.uid,
    userEmail : user.email,
    qty: Number(qty),
  })
  return result;
 }

 //fn to fetch orders
 const fetchMyBooks = async (userId) =>{
  const collectionRef = collection(firestore, "books");
  const q = query(collectionRef, where("userID", "==" , userId));
  const result = await getDocs(q);
  return result;
 }

 const getOrders = async (bookId) =>{
  const collectionRef = collection(firestore, 'books' , bookId , 'orders');
  const result = await getDocs(collectionRef);
  return result;
 }

 const isLoggedIn = user ? true : false;
 
  return (
  <FirebaseContext.Provider value={{signupUserWithEmailAndPassword, signinUserWithEmailAndPassword, signinWithGoogle , isLoggedIn , handleCreateNewListing, listAllBooks, getBookById , placeOrder, fetchMyBooks, user, getOrders}}>
    {props.children}
  </FirebaseContext.Provider>
  )
}