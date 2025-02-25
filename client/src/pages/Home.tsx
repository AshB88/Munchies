import { useState, useLayoutEffect } from "react";
import auth from '../utils/auth';
import GroceryPage from './GroceryPage';

const Home = () => {
    // State to check if the user is logged in
    const [loginCheck, setLoginCheck] = useState(false);

    // Check if the user is logged in when the component mounts
    useLayoutEffect(() => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    }, []);

    return (
        <>
            {!loginCheck ? (
                // Show a notice to log in if the user is not logged in
                <div className='notice'>
                    <h2>Please log in to view your grocery list!</h2>
                </div>
            ) : (
                // Show the GroceryPage component if the user is logged in
                <GroceryPage />
            )}
        </>
    );
};

export default Home;