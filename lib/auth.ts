import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";




//* Sign in with popup & Google as the provider
const googleProvider = new GoogleAuthProvider();


export const googleSignIn = async () => {

    await signInWithPopup(auth, googleProvider)
        .then((data) => {
            console.log(`${data.user.displayName} has signed in successfully!`);
        })
        .catch((error) => {
            console.error("There was an error signing in:", error);
            googleSignOut();
            return null;
        });

};


export const googleSignOut = async () => {

    await signOut(auth)
        .then(() => {
            console.log("User signed out");
        })
        .catch((error) => {
            console.error("There was an error signing out:", error);
        });

};



