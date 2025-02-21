import { useState, useLayoutEffect } from "react";
import auth from '../utils/auth';
import GroceryList from './GroceryPage';

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
                <div className='login-notice'>
                    <h2>Please log in to view your grocery list!</h2>
                </div>
            ) : (
                <GroceryList />
            )}
        </>
    );
};

export default Home;
