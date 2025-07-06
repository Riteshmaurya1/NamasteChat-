import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import toast from "react-hot-toast";

export const AppProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [activeChatUser, setActiveChatUser] = useState(null);
    const [profileData, setProfileData] = useState(null);

    // For the USer Profile
    const [wallpaper, setWallpaper] = useState(localStorage.getItem("chatWallpaper") || "");
    const [bubbleColor, setBubbleColor] = useState(localStorage.getItem("bubbleColor") || "green");

    // Login logic
    const login = async (email, password, navigate) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/user/login",
                { email, password },
                { withCredentials: true },
                { headers: { "Content-Type": "application/json" }, }
            );

            // Save token to localStorage
            localStorage.setItem("token", response.data.token);


            // Save user data to state
            setUserInfo({
                _id: response.data.user?._id || "",
                name: response.data.user?.name || "",
                email: response.data.user?.email || email,
                token: response.data.token,
            });
            localStorage.setItem("userId", response.data.user._id);
            console.log("This is LoggedIn User :=", response.data.user.name);
            navigate("/home");
            toast.success(response.data.message || "Logged In");
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Login failed");
            } else {
                toast.error("An error occurred");
            }
        }
    };

    const logout = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/user/logout",
                {},
                { withCredentials: true }
            );

            // Example: Clear any app state
            setUserInfo(null);
            localStorage.removeItem("userId")
            localStorage.removeItem("token");

            toast.success("Logged out successfully");
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Failed to log out");
        }
    };

    // Fetch all users once when app starts
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/user/getuserprofile", { withCredentials: true });
                console.log("Fetched users response:", response.data);
                setUsers(response.data.filteredfUser);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                toast.error("Failed to load users");
            } finally {
                setLoadingUsers(false);
            }
        };

        getAllUsers();
    }, []);

    const profile = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/user/profile", { withCredentials: true })
            setProfileData(response.data.profile);
            log(profileData)
        } catch (error) {
            console.error("Failed to fetch users:", error);
            toast.error("Failed to load users");
        } finally {
            setLoadingUsers(false);
        }
    }
    useEffect(() => {
        profile();
    }, []);

    return (
        <AppContext.Provider
            value={{
                userInfo,
                login,
                logout,
                users,
                loadingUsers,
                activeChatUser,
                setActiveChatUser,
                profileData,
                setProfileData,
                wallpaper,
                setWallpaper,
                bubbleColor,
                setBubbleColor,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
