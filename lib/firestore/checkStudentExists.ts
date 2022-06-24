import { firestore } from "../firebase";
import { getDoc, doc } from "firebase/firestore";




export default async function checkStudentExists(id: string): Promise<object> { //* Query based on firestore ID

    const studentRef = doc(firestore, "studentData", id);

    const getStudentData = async () => {

        const docSnap = await getDoc(studentRef);
      
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }

    };

    const studentData = await getStudentData();

    if (!studentData) {
        console.error("Student does not exist yet in the 'studentData' database!!! This should never happen"); //! this should never happen
    } else {
        console.log("Student exists in the 'studentData' database");
    }

    return studentData;


}