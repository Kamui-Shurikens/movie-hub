// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import {getFirestore,setDoc,doc, getDoc} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi5S3ecQ_yyC-EkGK4ID6yfDNxuAw1uyM",
  authDomain: "moviehub-38cc2.firebaseapp.com",
  projectId: "moviehub-38cc2",
  storageBucket: "moviehub-38cc2.appspot.com",
  messagingSenderId: "320027665466",
  appId: "1:320027665466:web:d9d5cdb4cd787483448103"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

const db = getFirestore()

export const signInWithGoogle = async ()=>{
    let result = await signInWithPopup(auth,provider)
    let userName = result.user.displayName
    let email = result.user.email
    let photoLink = result.user.photoURL
    localStorage.setItem("UserName",userName)
    localStorage.setItem("email",email)
    localStorage.setItem("photoLink",photoLink)

    // authorization done !

    const docRef = doc(db,"users",`${email}`)
    let docSnap = await getDoc(docRef)
    //localStorage.setItem("temp",JSON.stringify(docSnap.data()))
    if(docSnap.data() == undefined) // a new user, so store shell data for this user first
    {
      const payload = {Favourites : JSON.stringify([]) }
      await setDoc(docRef,payload)
      docSnap = await getDoc(docRef)
    }
    localStorage.setItem("Favourites",docSnap.data()["Favourites"])
    window.location.reload()
}

 export const signOutWithGoogle = async () =>{
  let email = localStorage.getItem("email")
  localStorage.removeItem("UserName")
  localStorage.removeItem("email")
  localStorage.removeItem("photoLink")
  const docRef = doc(db,"users",`${email}`)
  const payload = {Favourites : localStorage.getItem("Favourites") }
  await setDoc(docRef,payload)
  localStorage.removeItem("Favourites")
  window.location.reload()
}

export const updateFavsToFireBase = async ()=>{
  let email = localStorage.getItem("email")
  const docRef = doc(db,"users",`${email}`)
  const payload = {Favourites : localStorage.getItem("Favourites") }
  await setDoc(docRef,payload)
}

export const updateFavsFromFireBase = async ()=>{
  let email = localStorage.getItem("email")
  const docRef = doc(db,"users",`${email}`)
  let docSnap = await getDoc(docRef)
  let fvstr = docSnap.data()['Favourites']
  localStorage.setItem("Favourites",fvstr)
}



