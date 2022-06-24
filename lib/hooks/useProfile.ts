import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot } from "firebase/firestore";

import { firestore, auth } from "../firebase";
import { googleSignOut } from "../auth";
import getProfile from "../firestore/getProfile";
import { UserProfile, isUserProfile } from "../Interfaces";




export default function useProfile(): [string, UserProfile] {

    const [user] = useAuthState(auth);
    const [email, setEmail] = useState<string>("");
    const [profile, setProfile] = useState<UserProfile>(null);
    
    useEffect(() => {
        console.log("Changing profile");
        let unsubscribe;
        if (user) {

            if (!isValidEmail(user.email)) {
                // throw new TypeError("Invalid email address, must end in @andrew.cmu.edu");
                console.error("Invalid email address, must end in @andrew.cmu.edu"); //? maybe toast it
                return unsubscribe;
            }

            setEmail(user.email);
            
            unsubscribe = onSnapshot(
                doc(firestore, "profiles", user.email),
                (document) => {
                    if (document.exists()) {
                        const profile = document.data();
                        if (isUserProfile(profile)) {
                            setProfile(profile);
                        } else {
                            console.error("Invalid profile");
                            setProfile(null);
                        }
                    } else { // the document does not exist yet
                        const retrieveUserProfile = async () => {
                            const userProfile: UserProfile = await getUserProfile(user);
                            setProfile(userProfile);
                        }
                        retrieveUserProfile();
                    }
                }
            );

        } else {
            setEmail("");
            setProfile(null);
        }

        return unsubscribe;

    }, [user]);

    // useEffect(() => {
    //     console.log(profile);
    // }, [profile]);

    return [email, profile];

}


//* Retrieves the data using getProfile, and also checks if a username and role has been assigned
async function getUserProfile(user): Promise<UserProfile> {

    if (!isValidEmail(user.email)) {
        console.error(`${user.email} is not valid! Must end in '@andrew.cmu.edu' or '@gmail.com'. Returning null.`);
        return null;
    }
    
    const userProfile: UserProfile = await getProfile(user.email, user.displayName, user.photoURL);
    
    if (!userProfile) {
        console.error("There was an error retreiving a profile. Logging out");
        googleSignOut();
        return null;
    } else {
        return userProfile;
    }

}



function isValidEmail(email: string): boolean {
    if (!email.includes("@")) {
        return false;
    }
    const parts = email.split("@");
    if (parts.length !== 2) {
        return false;
    }
    if ((parts[1] !== "andrew.cmu.edu") && (parts[1] !== "gmail.com")) {
        return false;
    }
    return true;
    // const emailRegex = new RegExp("/^\w+([\.-]?\w+)*@(andrew.cmu.edu|gmail.com)");
    // return emailRegex.test(email);
}


