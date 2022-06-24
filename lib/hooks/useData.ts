import { useState, useEffect } from "react";

import useProfile from "./useProfile";
import useStudentData from "./useStudentData";
import { UserData, UserProfile, isUserProfile, StudentData, isStudentData, TAData, isTAData, isUserData } from "../Interfaces"



//* Wrapper for the other hooks
export default function useData(): UserData {

    const [email, userProfile]: [string, UserProfile] = useProfile();
    const studentData: StudentData = useStudentData(userProfile?.id);
    const TAData: TAData = null; //TODO add useTAData() in the future
    const [userData, setUserData] = useState<UserData>(null);

    useEffect(() => {

        console.log("Changing data");
        if (!isUserProfile(userProfile)) {
            setUserData(null);
        } else {
            let newData: UserData = {
                email,
                profile: userProfile,
                data: null
            };
            if (studentData && !TAData && userProfile.role === "Student" && isStudentData(studentData)) {
                newData.data = studentData;
            } else if (!studentData && TAData && userProfile.role === "TA" && isTAData(TAData)) {
                newData.data = TAData;
            }
            setUserData(newData);
        }
       
    }, [email, userProfile, studentData, TAData]);

    return userData;

}