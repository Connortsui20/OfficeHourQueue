import '../styles/globals.css'

import { UserContext } from "../lib/context";
import useData from "../lib/hooks/useData";
import Navbar from "../components/Navbar";



function MyApp({ Component, pageProps }) {
    
    const userData = useData();
    
    return (
        <UserContext.Provider value={ userData }>
            <Navbar />
            <Component {...pageProps} />
        </UserContext.Provider>
    );
    
}

export default MyApp
