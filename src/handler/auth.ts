import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { SetDocument, UpdateDocument } from "../firebase/firebase-handler";

export async function SignUp(name: string, email: string, password: string) {
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const { user } = credentials;
  await updateProfile(user, { displayName: name });
  await SetDocument("user", user.uid, {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: new Date(),
    lastSignInAt: new Date(),
  });
  return credentials;
}

export async function SignIn(email: string, password: string) {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  const { uid } = credentials.user;
  await UpdateDocument("user", uid, { lastSignInAt: new Date() });
  return credentials;
}
