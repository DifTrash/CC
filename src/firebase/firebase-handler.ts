import { db } from "./config";
import {
  doc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function AddDocument(collectionPath: string, data: object) {
  return await addDoc(collection(db, collectionPath), data);
}

export async function SetDocument(
  collectionPath: string,
  documentId: string,
  data: object
) {
  return await setDoc(doc(db, collectionPath, documentId), data);
}

export async function UpdateDocument(
  collectionPath: string,
  documentId: string,
  data: object
) {
  return await updateDoc(doc(db, collectionPath, documentId), data);
}

export async function GetCollection(collectionPath: string) {
  return await getDocs(collection(db, collectionPath));
}

export async function GetDocument(collectionPath: string, documentId: string) {
  return await getDoc(doc(db, collectionPath, documentId));
}

export async function DeleteDocument(
  collectionPath: string,
  documentId: string
) {
  return await deleteDoc(doc(db, collectionPath, documentId));
}
