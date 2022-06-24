import { UserProfile, isUserProfile } from "../Interfaces"
import checkUserExists from "./checkUserExists";
import addUserProfile from "./addUserProfile";



//* Returns the profile of the user, and if it does not exist yet, creates it. Returns null if it fails.
export default async function getProfile(email: string, displayName: string, photoURL: string): Promise<UserProfile> {

    const userProfile: object = await checkUserExists(email);

    if (isUserProfile(userProfile)) { // check if the profile matches the UserProfile Interface
        return (userProfile);
    } else {
        if (!userProfile) { // user does not exist yet (null)
            const newProfile: object = await addUserProfile(email, displayName, photoURL); // add the user
            if (isUserProfile(newProfile)) {
                return newProfile;
            } else {
                console.error("The returned profile does not match the UserProfile Interface. Returning null.");
                return null;
            }
        } else {
            console.error("The returned profile does not match the UserProfile Interface. Returning null.");
            return null;
        }
    }

}





