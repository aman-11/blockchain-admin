import React, { useEffect, useState } from "react";
import {Link, useLocation} from 'react-router-dom'
import './Navbar.css';
const Navbar = () => {
  const location = useLocation();
  const [admin, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    const token = admin ?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  
  return (
    <div>
      <nav>
        <h1>
          {admin ?
            (<Link to="/dashboard">Serve Humanity</Link>)
            :
            ( <Link to="/">Serve Humanity</Link>)
          }
        </h1>
        <ul>
          {admin ? (
           <li>
              <Link to="/" className="btn" onClick={() => localStorage.clear()} style={{color:'white'}}>
              LOGOUT
            </Link>
          </li>
          ) : (
              <>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                <Link to="/signin" className="btn" >Sign In</Link>
                </li>
              </>
          )}
          
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
