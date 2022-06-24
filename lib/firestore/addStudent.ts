import { addDoc, collection } from "firebase/firestore";

import { firestore } from "../firebase";
import { StudentData } from "../Interfaces";



//* Creates a student in the "studentData" collection,
//* returns the auto-generated ID of that document
export default async function addStudent(): Promise<string> {

    const studentDataRef = collection(firestore, "studentData");

    const newStudent: StudentData = {
        meetingsAttended: 0,
        penalties: 0,
        inQueue: false,
        inMeeting: false,
    };
    
    const studentDoc = await addDoc(studentDataRef, newStudent);

    return studentDoc.id;
    
}