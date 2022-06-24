import { firestore } from "../firebase";
import { getDoc, doc } from "firebase/firestore";




export default async function checkTAExists(id: string): Promise<object> { //* Query based on firestore ID

    const TARef = doc(firestore, "TAData", id);

    const getTAData = async () => {

        const docSnap = await getDoc(TARef);
      
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }

    };

    const TAData = await getTAData();

    if (!TAData) {
        console.error("TA does not exist yet in the 'TAData' database!!! This should never happen"); //! this should never happen
    } else {
        console.log("TA exists in the 'TAData' database");
    }

    return TAData;


}