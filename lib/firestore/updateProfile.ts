import { firestore } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";



export default async function updateProfile(newProfile: object, email: string) {

    const userRef = doc(firestore, "profiles", email);

    // Update a document if it exists
    await updateDoc(userRef, newProfile)
        .then(() => {
            console.log("Updated!");
        })
        .catch((err) => {
            console.error(err);
        });

}