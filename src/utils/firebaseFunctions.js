import { firestore } from "../firebase";
import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  getDocs,
} from "firebase/firestore";

//Saving new Item
export const saveItem = async (data) => {
  // si no hay la coleccion foodItems se creara
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

//get all food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
