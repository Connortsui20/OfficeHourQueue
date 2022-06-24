import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { UserContext } from "../lib/context";
import { UserProfile } from "../lib/Interfaces";
import checkTAExists from "../lib/firestore/checkTAExists";


export default function TAQueue() {

    // const userData: UserData = useContext(UserContext);

    // const router = useRouter();

    // useEffect(() => {
    //     if (userData === null) {
    //         router.push("/login");
    //     } else if (userData.userData.role === "Student") {
    //         router.push("/studentqueue");
    //     } else if (userData.userData.role !== "TA")
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userData]);

    // if (userData) {
    //     const TAData = checkTAExists(userData.userData.id);
    
    //     if (!TAData) {
    //         console.error("TA does not exists in the TAtData collection yet");
    //     }
    // }
    
    return (
        <div>
            This is the TA Queue page!
        </div>
    );

}










