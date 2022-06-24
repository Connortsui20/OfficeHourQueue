import { QueueItem, UserData, isStudentData } from "../Interfaces";
import updateStudent from "./updateStudent";
import removeQueueItem from "./removeQueueItem";


//* Updates studentData document and removes a QueueItem to the queue database
export default async function removeStudent(userData: UserData): Promise<boolean> {

    if (!isStudentData(userData.data)) {
        throw new Error("Student data is invalid while trying to dequeue");
    }

    userData.data.inQueue = false;
    const updated = await updateStudent(userData.data, userData.profile.id);
    if (!updated) {
        console.error("Something went wrong trying to remove student");
        return false;
    }

    const success = await removeQueueItem(userData.email);
    if (!success) { //* revert if something went wrong
        userData.data.inQueue = true;
        await updateStudent(userData.data, userData.profile.id);
        return false;
    }
    return true;

}


