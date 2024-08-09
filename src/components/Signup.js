import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // State to track errors

    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        // Check if the user is already authenticated
        const auth = localStorage.getItem('user'); // Ensure this matches the key you use elsewhere
        if (auth) {
            navigate('/'); // Redirect if authenticated
        }
    }, [navigate]);

    const collectData = async () => {
        console.warn(name, email, password);
        try {
            let result = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            if (!result.ok) {
                throw new Error(`HTTP error! Status: ${result.status}`);
            }

            result = await result.json(); // Parse JSON response
            console.warn(result);

            // Store user data in localStorage
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));

            // Navigate to the home page after successful signup
            navigate('/');
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Failed to sign up. Please try again.'); // Set error message
        }
    };

    return (
        <div className="register">
            <h1>Register</h1>

            {error && <p className="error">{error}</p>} {/* Display error message if any */}

            <input className="inputBox" type="text"
                value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />

            <input className="inputBox" type="text"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />

            <input className="inputBox" type="password"
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />

            <button onClick={collectData} className='appButton' type='button'>Sign Up</button>
        </div>
    );
}

export default Signup;
