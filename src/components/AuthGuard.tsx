// src/components/AuthGuard.tsx
import React, { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";  // Import jwt-decode
import { jwtDecode } from 'jwt-decode'

// Define the type for the decoded token (JWT payload)
interface DecodedToken {
  exp: number;  // Expiration time of the token (in seconds)
}

// Utility function to check if the token is valid and not expired
const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decodedToken: DecodedToken = jwtDecode(token);  // Decode the token using jwt-decode
    const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds
    const currentTime = Date.now();

    return expirationTime > currentTime; // Token is valid if it's not expired
  } catch (error) {
    return false; // If decoding fails, consider the token invalid
  }
};

// Define the type for the props of AuthGuard
interface AuthGuardProps {
  children: ReactNode;  // Children can be any valid React node
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // State to track authentication status

  useEffect(() => {
    // Get the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      if (isTokenValid(accessToken)) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        // Redirect to login if the token is expired or invalid
        navigate("/signin");
      }
    } else {
      setIsAuthenticated(false);
      // Redirect to login if no access token is present
      navigate("/signin");
    }
  }, [navigate]);

  // Optionally, render a loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If authenticated, render the children components (page content)
  return isAuthenticated ? <>{children}</> : null;  // Ensure children are properly rendered as JSX
};

export default AuthGuard;
