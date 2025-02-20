import { useState, useLayoutEffect } from "react";
import auth from '../utils/auth';
import GroceryList from './GroceryList';

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
                <div className='login-notice'></div>
            ) : (
                <GroceryList />
            )}
        </>
    );
};

export default Home;
