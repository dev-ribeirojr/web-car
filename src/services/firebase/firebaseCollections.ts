import { collection } from "firebase/firestore";
import { db } from ".";

export const collectionCars = collection(db, "cars")