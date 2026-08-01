import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/firestore'

function goalsRef(uid) {
  return collection(db, 'users', uid, 'goals')
}

export async function getGoals(uid) {
  const snapshot = await getDocs(query(goalsRef(uid), orderBy('createdAt', 'desc')))
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export async function saveGoal(uid, goal) {
  const docRef = await addDoc(goalsRef(uid), goal)
  return { id: docRef.id, ...goal }
}

export async function deleteGoal(uid, goalId) {
  await deleteDoc(doc(db, 'users', uid, 'goals', goalId))
}