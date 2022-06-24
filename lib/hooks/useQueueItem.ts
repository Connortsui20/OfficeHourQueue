import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { firestore } from "../firebase";
import { QueueItem, isQueueItem, UserData } from "../Interfaces";


export default function useQueueItem(userData: UserData): QueueItem {

    const [queueItem, setQueueItem] = useState<QueueItem>(null);

    useEffect(() => {

        console.log("Changing Queue Item");

        let unsubscribe;
        
        if (userData) {

            unsubscribe = onSnapshot(
                doc(firestore, "queue", userData.email),
                (document) => {
                    if (document.exists()) {
                        const data = document.data();
                        if (isQueueItem(data)) {
                            setQueueItem(data);
                        } else {
                            console.error("queueItem document is not valid");
                            setQueueItem(null);
                        }
                    } else {
                        console.log("queueItem document does not exist yet");
                        setQueueItem(null);
                    }
                }
            );

        } else {
            setQueueItem(null);
        }

        return unsubscribe;
        
    }, [userData]);


    return queueItem;

}

