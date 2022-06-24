import Link from "next/link";
import { useContext } from 'react';

import { UserContext } from '../lib/context';
import { UserData, isStudentData } from "../lib/Interfaces";
import { googleSignOut } from "../lib/auth";
import dequeueStudent from "../lib/firestore/dequeueStudent";



export default function Navbar() {

    const userData: UserData = useContext(UserContext);
 
    const handleLogout = () => {
        console.log("Logging out");
        googleSignOut();
    }
    
    return (
        <nav className="navbar">
            <ul>

            {/* User is signed-in */}
            {userData && (
                <>
                    <li className="push-left">
                        {(userData.profile.role === "TA") && (
                                <Link href="/admin">
                                    <button className="btn-blue">Add Users (Do not press this button)</button>
                                </Link>
                        )}
                        {(userData.profile.role === "Student" && isStudentData(userData.data) && userData.data)
                            && ( <div>
                            {
                                (isStudentData(userData.data) && !userData.data.inQueue) ?
                                <Link href="/enqueue">
                                    <button className="btn-blue"> Join queue </button>
                                </Link>
                                :
                                <button className="btn-blue" onClick={() => {dequeueStudent(userData)}}> Leave queue </button>
                            } </div>
                        )}
                    </li>
                    {/*(userProfile.profile.role === "Admin") && (
                        <li>
                            <Link href="/admin">
                                <button className="btn-blue"> Admin page </button>
                            </Link>
                        </li>
                    )*/}

                    <Link href="/login">
                        <button className="btn-grey" onClick={handleLogout}>Log out</button>
                    </Link>
                        
                    <li>
                        <img src={userData.profile.photoURL} alt="User Photo"/>
                    </li>
                
                </>
            )}

            {/* User is not signed-in */}
            {!userData && (
                <>
                    <li className="push-left">
                        <Link href="/login">
                            <button className="btn-blue">Log in</button>
                        </Link>
                    </li>
                </>
            )}

            </ul>
        </nav>
    );

}