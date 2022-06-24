import { firestore } from "../firebase";
import { getDoc, doc } from "firebase/firestore";



//* Specifically queries the 'profiles' collection by email, returns the object if it exists, null otherwise
export default async function checkUserExists(email: string): Promise<object> { //? displayName?

    console.log("Querying User by email");
    
    const userRef = doc(firestore, "profiles", email);

    const getUserProfile = async () => {

        const docSnap = await getDoc(userRef);
      
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }

    };

    const userData = await getUserProfile();

    if (!userData) {
        console.log("User does not exist yet in the 'profiles' database");
    } else {
        console.log("User exists in the 'profiles' database");
    }

    return userData;

}



/* legacy code

const profilesRef = collection(firestore, "profiles");

const userQuery = query(profilesRef, where("email", "==", email));

const querySnapshot = await getDocs(userQuery);

let user = null;

querySnapshot.forEach((doc) => { // should only have 1
    console.log(doc.data());
    user = doc.data(); // grabs the first one, since it should be unique
});

if (user === null) {
    console.log("User does not exist yet in the 'profiles' database");
} else {
    console.log("User exists in the 'profiles' database");
}

return user; // if the query does not find anything return null

*/
