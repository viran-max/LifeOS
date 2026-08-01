import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { app } from './config'

export const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider)
}

export function signOutUser() {
  return signOut(auth)
}

export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback)
}