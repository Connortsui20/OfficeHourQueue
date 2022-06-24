import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../lib/firebase";
import { UserContext } from "../lib/context";
import { UserData, isStudentData, QueueItem,  } from "../lib/Interfaces";
import Loader from "../components/Loader";
import useQueueItem from "../lib/hooks/useQueueItem";


// export async function getServerSideProps(context) {
//     //* Need to retrieve the entire queue of students

    
//     return {
//         props: {  }, // will be passed to the page component as props
//     };

// }



export default function StudentQueue() {

    const userData: UserData = useContext(UserContext);
    const [user] = useAuthState(auth);
    const queueItem: QueueItem = useQueueItem(userData);
    
    const router = useRouter();

    useEffect(() => {
        console.log("Changing router");
        if (userData === null) {
            router.push("/login");
        } else if (userData.profile.role === "TA") {
            router.push("/taqueue");
        } else if (userData.profile.role !== "Student") {
            console.error("Something went wrong, you are not entered as a student");
            router.push("/login");
        } else if (!user) {
            router.push("/login");
        }
    }, [user]);

    const data = userData?.data;
    
    // just to make sure that everything works properly
    if (userData && data && isStudentData(data) && userData.profile.role === "Student") {

        return (
            <div>
                This is the Student Queue page! Hello {userData.profile.displayName} aka {userData.profile.username}
                {
                    (!data.inMeeting && !data.inQueue) && (
                        <div>
                            Student is not in the queue nor in a meeting
                        </div>
                    )
                }
                {
                    (!data.inMeeting && data.inQueue) && (
                        <div>
                            Student is currently in the queue!
                            {
                                (queueItem && (
                                    <ul>
                                        <li>Position: {queueItem.position}</li>
                                        <li>Location: {queueItem.location}</li>
                                        <li>Question type: {queueItem.questionType}</li>
                                        <li>Question: {queueItem.question}</li>
                                        <li>Notes: {queueItem.studentNotes}</li>
                                    </ul>
                                ))
                            }
                        </div>
                    )
                }
                {
                    (data.inMeeting && !data.inQueue) && (
                        <div>
                            Student is currently in a meeting!
                        </div>
                    )
                }
            </div>
        );

    } else {
        return (<div> <Loader /> </div>);
    }

}

































