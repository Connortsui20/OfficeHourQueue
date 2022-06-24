import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { UserContext } from "../lib/context";
import { UserData, QueueItem, isTAData, isStudentData } from "../lib/Interfaces";
import Loader from "../components/Loader";
import enqueueStudent from "../lib/firestore/enqueueStudent";


//* Need a specific Enqueue page for form popup, but not for dequeue
export default function Enqueue() {

    const userData: UserData = useContext(UserContext);

    const router = useRouter();

    useEffect(() => {
        console.log("Changing router");
        if (userData === null) {
            router.push("/login");
        } else if (isTAData(userData.data)) {
            router.push("/taqueue");
        } else if (!isStudentData(userData.data)) {
            console.error("Something went wrong, you are not entered as a student");
            router.push("/login");
        } else if (userData.data.inQueue) {
            router.push("/studentqueue"); // redirect back to student home page
        }
    }, []);

    const [location, setLocation] = useState<string>("");
    const [questionType, setQuestionType] = useState<string>(""); //* in the future make a stronger type
    const [question, setQuestion] = useState("");
    const [studentNotes, setStudentNotes] = useState("");

    const submitForm = async (e) => {

        e.preventDefault();
        const item: QueueItem = {
            enqueuedAt: null,
            position: 0,
            location,
            questionType,
            question,
            isFrozen: false,
            studentNotes,
            TANotes: "",
        };

        const success = await enqueueStudent(item, userData);
        if (!success) { //! figure out a better redirect
            console.error("An error occurred, returning to login");
            router.push("/login");
        } else {
            router.push("/studentqueue");
        }

    }

    if (userData) {
        return (
            <div>
                <h2> Fill in the details! </h2>
                <form onSubmit={submitForm}>
                    <div>Enter location</div>
                    <input name="location" placeholder="Gates 5th floor Commons" onChange={(e) => {setLocation(e.target.value)}} />
                    <div>Enter Question type</div>
                    <input name="question type" placeholder="Homework" onChange={(e) => {setQuestionType(e.target.value)}} />
                    <div>Enter Question</div>
                    <input name="question" placeholder="Why do pigs fly?" onChange={(e) => {setQuestion(e.target.value)}} />
                    <div>Enter any notes and/or comments!</div>
                    <input name="notes" placeholder="I am very happy today!" onChange={(e) => {setStudentNotes(e.target.value)}} />
                    <button type="submit"> Submit </button>
                </form>
            </div>
        );
    } else {
        return (<div> <Loader /> </div>);
    }

    

}




