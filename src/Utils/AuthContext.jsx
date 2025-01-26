/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteconfig";
import { useNavigate } from "react-router";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserOnLoad();
    }, []);

    const getUserOnLoad = async () => {
        try {
            const accountDetails = await account.get();
            setUser(accountDetails);
            console.log("User fetched successfully:", accountDetails);
        } catch (error) {
            console.log("No active session. User is not logged in.", error);
            setUser(null); // Explicitly set user to null when no session exists
        } finally {
            setLoading(false); // Ensure loading stops even if there’s no session
        }
    };

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            // Use createEmailSession instead of createSession
            await account.createEmailPasswordSession(credentials.email, credentials.password);
            const accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error.message);
            alert("Login failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
            navigate("/login"); // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
      };

      const handleRegister = async (e, credentials) => {
        e.preventDefault();
        
        if (credentials.password1 !== credentials.password2) {
            alert("Passwords did not match!");
            return;
        }
    
        try {
            // Generate a unique user ID that meets Appwrite's constraints
            const userId = credentials.email.split('@')[0].replace(/[^a-zA-Z0-9_.-]/g, '').substring(0, 36);
    
            const userResponse = await account.create(
                userId, 
                credentials.email, 
                credentials.password1, 
                credentials.name
            );
    
            // Create a session immediately after registration
            await account.createEmailPasswordSession(credentials.email, credentials.password1);
    
            const accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error.message);
            alert("Registration failed: " + error.message);
        }
    };
    

    const contextData = {
        user,
        handleUserLogin,
        handleLogout,
        handleRegister,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
