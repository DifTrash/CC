import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export async function AddPredict(uid: string, data: object) {
  const userDocRef = doc(db, "user", uid);
  return addDoc(collection(userDocRef, "predict"), {
    ...data,
    createdAt: new Date(),
  });
}

export async function GetPredict(uid: string) {
  const userDocRef = doc(db, "user", uid);
  const predictCollectionRef = collection(userDocRef, "predict");
  const snapshot = await getDocs(predictCollectionRef);
  const predictions = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return predictions;
}
