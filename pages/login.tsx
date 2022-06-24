
import { useState,  useContext, } from "react";
import { useRouter } from "next/router";

import { googleSignIn } from "../lib/auth";
import { UserContext } from "../lib/context";
import { UserData, UserProfile } from "../lib/Interfaces";
import addStudent from "../lib/firestore/addStudent";
import updateProfile from "../lib/firestore/updateProfile";




export default function Login() {

    const userData: UserData = useContext(UserContext);

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
            {
            profile ?
                <div>
                    {profile.displayName} is signed in!
                    {
                    (profile.username && profile.role && profile.id) ?
                        <div>
                            User has a username and role!
                        </div>
                        :
                        <div>
                            User does not have a username or role.
                            <UsernameForm />
                        </div>
                    }
                </div>
                :
                <div>
                    This is the login page!
                    <button className="btn-google" onClick={googleSignIn}>
                        <div className="google-wrapper">
                            <img src={"/google.png"} alt="Google Logo"/>
                        </div>
                        Sign in with Google
                    </button>
                </div>
            }
        </div>
    );

}



//* This form will only be used by students
function UsernameForm() {

    const userData: UserData = useContext(UserContext);
    
    const [username, setUsername] = useState<string>("");

    const submitUsername = async (e) => {

        e.preventDefault();
        const names = username.split(" ");

        if (names.length >= 2) { //? at least 2 names, not sure to enforce

            const studentID: string = await addStudent();
            const newProfile: UserProfile = { //* update from client side here
                ...userData.profile,
                username: username,
                role: "Student",
                id: studentID,
            };

            if (userData.profile.id === "") { //* One last check to make sure duplicates don't occur
                await updateProfile(newProfile, userData.email);
            } else {
                console.error("Student already has a studentData document");
            }

        } else {
            console.log("Please enter 2 names, one first preferred name and one last name"); //TODO make this a toast popup
        }
        
    }

    return ( //! In the future use material-ui or react-radio-buttons
        <div>
            <h3> Enter your first preferred name and last name </h3>
            <form onSubmit={submitUsername}>
                <input name="username" placeholder="First and Last" onChange={(e) => {setUsername(e.target.value)}} />
                <button type="submit"> Submit </button>
            </form>
        </div>
    );

}



