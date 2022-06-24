
import { setDoc, doc } from "firebase/firestore";

import { firestore } from "../firebase";
import { QueueItem } from "../Interfaces";



//* Adds a QueueItem to the queue collection, does not return anything
export default async function addQueueItem(item: QueueItem, email: string): Promise<boolean> {

    const queueRef = doc(firestore, "queue", email);

    try {
        await setDoc(queueRef, item);
        return true;
    } catch (err) {
        console.error("Error adding the profile documnet:", err);
        return false;
    }

}