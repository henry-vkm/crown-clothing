// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  writeBatch,
  collection,
  getDocs,
  query
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0_Pqg2Der7nOHna2bQazmv-Hg5HOfiVQ",
  authDomain: "crown-clothing-db-b0821.firebaseapp.com",
  projectId: "crown-clothing-db-b0821",
  storageBucket: "crown-clothing-db-b0821.appspot.com",
  messagingSenderId: "383458808753",
  appId: "1:383458808753:web:4355685f757b72f398e390"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth();

export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());

    batch.set(docRef, object);
  })

  await batch.commit();
}

export const getCollectionAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  // .reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
    
  //   return acc;
  // }, []);
}

export const createUserDocFromAuth = async (
  userAuth, 
  additionalInfo = {}
) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      })
    } catch (error) {
      console.log("error creating user, ", error.message);
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email && !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
  return await signOut(auth);
}
 
export const onAuthStateChangedHandler = (callback) => {
  onAuthStateChanged(auth, callback);
}

