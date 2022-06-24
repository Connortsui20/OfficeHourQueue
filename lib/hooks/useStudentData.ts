import { useState, useEffect } from "react";
// import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, onSnapshot } from "firebase/firestore";

import { firestore } from "../firebase";
import { StudentData, isStudentData } from "../Interfaces"


//TODO potentially use useDocumentData from react-firebase-hooks
//* Takes in firebase id of the studentData document
export default function useStudentData(id: string): StudentData {

    const [studentData, setStudentData] = useState<StudentData>(null);
    
    useEffect(() => {
        console.log("Changing student data");

        let unsubscribe;

        if (id) {
            
            unsubscribe = onSnapshot(
                doc(firestore, "studentData", id),
                (document) => {
                    if (document.exists()) {
                        const data = document.data();
                        if (isStudentData(data)) {
                            setStudentData(data);
                        } else {
                            console.error("studentData document is not valid");
                            setStudentData(null);
                        }
                    } else {
                        console.error("studentData document does not exist");
                        setStudentData(null);
                    }
                }
            );
        } else {
            setStudentData(null);
        }

        return unsubscribe;

    }, [id]);

    return studentData;

}


