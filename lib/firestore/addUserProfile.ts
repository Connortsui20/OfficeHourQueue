import { setDoc, doc } from "firebase/firestore";

import { firestore } from "../firebase";
import { UserProfile } from "../Interfaces";



//* Directly adds a profile to the 'profiles' collection
export default async function addUserProfile(email: string, displayName: string, photoURL: string): Promise<Object> {

    const userRef = doc(firestore, "profiles", email); // creates document labeled by email

    const userProfile: UserProfile = {
        displayName,
        photoURL,
        username: "", // leave blank on creation
        role: "",
        id: "",
    }

    try {
        console.log(`Adding ${displayName} to profiles collection`);
        await setDoc(userRef, userProfile);
        return userProfile;
    }
    
    catch (err) {
        console.error("Error adding the profile documnet:", err);
        return null;
    }

}
