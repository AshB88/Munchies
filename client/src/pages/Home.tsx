import { useState, useLayoutEffect } from "react";
import auth from '../utils/auth';
import GroceryPage from './GroceryPage';

const Home = () => {
    const [loginCheck, setLoginCheck] = useState(false);

    useLayoutEffect(() => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    }, []);

    return (
        <>
            {!loginCheck ? (
                <div className='notice'>
                    <h2>Please log in to view your grocery list!</h2>
                </div>
            ) : (
                <GroceryPage />
            )}
        </>
    );
};

export default Home;