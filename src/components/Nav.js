import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Nav = () => {
    const auth = localStorage.getItem('users'); // Retrieve user data from localStorage
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear(); // Clear local storage
        navigate('/signup'); // Navigate to signup page
    };

    const user = auth ? JSON.parse(auth) : null; // Parse user info from localStorage

    return (
        <div>
            <img
                alt="logo"
                className='logo'
                src='https://imgs.search.brave.com/rdquH59VPkN7tSZUQUBCcuuHYwrpfJMN32tJgAbe8a0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9keW5h/bWljLmJyYW5kY3Jv/d2QuY29tL2Fzc2V0/L2xvZ28vODMyYTFk/ZTQtZjljNC00N2E0/LWFhYmUtZmY2MTBi/NzEzMTE5L2xvZ28t/c2VhcmNoLWdyaWQt/MXg_bG9nb1RlbXBs/YXRlVmVyc2lvbj0x/JnY9NjM3OTE5ODE4/MzEzOTcwMDAw.jpeg'
            />
            {auth ? (
                <ul className='nav-ul'>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update">Update Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li>
                        <button onClick={logout} className='logout-button'>
                            Logout ({user ? user.name : 'User'})
                        </button>
                    </li>
                </ul>
            ) : (
                <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            )}
        </div>
    );
};

export default Nav;
