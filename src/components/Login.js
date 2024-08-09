import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Ensure this key matches
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      console.warn(result);

      if (result.auth) {
        // Store the user and token in localStorage
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("authToken", result.auth); // Store token as 'authToken'
        console.log("User and token saved:", result.user, result.auth); // Debugging line
        navigate("/");
      } else {
        alert("Please enter the correct details.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        className="inputBox"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        onClick={handleLogin}
        className='appButton'
        type='button'
      >
        Login
      </button>
    </div>
  );
};

export default Login;
