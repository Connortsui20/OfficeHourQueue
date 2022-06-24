import { QueueItem, UserData, isStudentData } from "../Interfaces";
import updateStudent from "./updateStudent";
import addQueueItem from "./addQueueItem";


//* Updates studentData document and adds a QueueItem to the queue database
export default async function enqueueStudent(item: QueueItem, userData: UserData): Promise<boolean> {

    if (!isStudentData(userData.data)) {
        throw new Error("Student data is invalid while trying to enqueue");
    }

    userData.data.inQueue = true;
    const updated = await updateStudent(userData.data, userData.profile.id);
    if (!updated) {
        console.error("Something went wrong trying to add student");
        return false;
    }
   


    const success = await addQueueItem(item, userData.email);
    if (!success) {
        console.error("Something went wrong adding Queue Item, reverting");
        userData.data.inQueue = false;
        await updateStudent(userData.data, userData.profile.id);
        return false;
    }
    return true;


}


