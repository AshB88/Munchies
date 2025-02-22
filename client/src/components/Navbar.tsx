import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
// Home, Purchased List
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in using auth.loggedIn() method
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);  // Set loginCheck to true if user is logged in
    }
  };

  // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
  useEffect(() => {
    checkLogin();  // Call checkLogin() function to update loginCheck state
  }, [loginCheck]);  // Dependency array ensures useEffect runs when loginCheck changes

  return (
    <header>
      <h1>
        Munchies
      </h1>
      <div className="navbar">
        {
          // Conditional rendering based on loginCheck state
          !loginCheck ? (
            // Render login button if user is not logged in
            /*
            <button className="btn" id="login" type='button'>
              <Link to='/login'>Login</Link>
            </button>
            */
            <div>
              <ul className="nav-links">
                <li className="nav-item"><Link to='/login'>Login</Link></li>
              </ul>
            </div>
          ) : (
            // Render logout button if user is logged in
            <>
            {/*
              <button className="btn" id="logout" type='button' onClick={() => {
                auth.logout();  // Call logout() method from auth utility on button click
              }}>Logout</button>
            */}
              <div>
                <ul className="nav-links">
                  <li className="nav-item"><Link to='/'>Home</Link></li>
                  <li className="nav-item"><Link to='/PurchasedItems'>Purchased Items</Link></li>
                  <li className="nav-item"><Link to='/' onClick={() => {
                    auth.logout();  // Call logout() method from auth utility on button click
                  }}>Logout</Link></li>
                </ul>
              </div>
            </>
          )
        }
      </div>
    </header>
  )
}

export default Navbar;
