import { firestore } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";



export default async function updateStudent(newStudent: object, id: string): Promise<boolean> {
    
    const studentRef = doc(firestore, "studentData", id);

    // Update a document if it exists
    await updateDoc(studentRef, newStudent)
        .then(() => {
            console.log("Updated student!");
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
    return true;

}