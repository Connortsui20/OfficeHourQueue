
import { deleteDoc, doc } from "firebase/firestore";

import { firestore } from "../firebase";
import { QueueItem } from "../Interfaces";



//* Adds a QueueItem to the queue collection, does not return anything
export default async function removeQueueItem(email: string): Promise<boolean> {

    const queueRef = doc(firestore, "queue", email);

    try {
        await deleteDoc(queueRef);
        return true;
    } catch (err) {
        console.error("Error removing the profile documnet:", err);
        return false;
    }

}