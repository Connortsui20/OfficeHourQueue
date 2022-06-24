import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

import { UserContext } from "../lib/context";
import { UserData, UserProfile } from "../lib/Interfaces";



//? Citation https://medium.com/nerd-for-tech/lets-deploy-a-next-js-app-with-firebase-hosting-e070b3aecd04

export default function Home() {
    
    const userData: UserData = useContext(UserContext); //grabs it from the head of the tree

    const profile: UserProfile = userData?.profile;
    
    const router = useRouter();
    
    if (profile && profile.role && profile.username && profile.id) {
        if (profile.role === "Student") {
            router.push("/studentqueue");
        } else if (profile.role === "TA") {
            router.push("/taqueue");
        } else {
            console.error("Role is neither Student nor TA");
        }
    }

    return (
        <div>
            This is the home page
            <Link href="/login">
                <button className="btn-green"> Another button that goes to log in </button>
            </Link>
        </div>
    );

}
