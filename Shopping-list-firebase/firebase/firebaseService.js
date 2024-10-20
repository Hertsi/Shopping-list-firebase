import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from './firebaseConfig';

const collectionName = "shoppingList";

export const getItems = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return items;
};

export const addItem = async (item) => {
  await addDoc(collection(db, collectionName), { name: item });
};

export const deleteItem = async (id) => {
  await deleteDoc(doc(db, collectionName, id));
};