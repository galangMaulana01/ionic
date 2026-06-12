import { getAuth, signInWithCredential, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Capacitor } from '@capacitor/core';
import firebaseApp from '../firebase.js';

const auth = getAuth(firebaseApp);

export async function signInWithGoogle() {
  if (Capacitor.isNativePlatform()) {
    // Android/iOS
    const result = await FirebaseAuthentication.signInWithGoogle();
    const credential = GoogleAuthProvider.credential(result.credential?.idToken);
    const userCredential = await signInWithCredential(auth, credential);
    return userCredential.user;
  } else {
    // Web
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  }
}

export async function signOut() {
  await auth.signOut();
}

export function getUser() {
  return auth.currentUser;
}
