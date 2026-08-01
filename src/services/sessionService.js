import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/firestore'

function sessionsRef(uid) {
  return collection(db, 'users', uid, 'sessions')
}

export async function getSessions(uid) {
  const snapshot = await getDocs(query(sessionsRef(uid), orderBy('finishedAt', 'desc')))
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export async function saveSession(uid, session) {
  const docRef = await addDoc(sessionsRef(uid), session)
  return { id: docRef.id, ...session }
}