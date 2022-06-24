import { createContext } from "react";
import { UserProfile, UserData } from "./Interfaces";


const profile: UserProfile = {
    displayName: "",
    photoURL: "",
    username: "",
    role: "",
    id: "",
}


const userData: UserData = {
    email: "",
    profile,
    data: null,
}


export const UserContext = createContext(userData);






