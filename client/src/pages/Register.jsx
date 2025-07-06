import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";


export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/api/user/register",
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            // reset form fields
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });

            // ✅ Save token to localStorage
            localStorage.setItem("token", response.data.token);
            //  Save User._id from DB
            localStorage.setItem("userId", response.data.newUser._id);

            toast.success("Registered successfully!");
            // Example: navigate("/login");
            navigate("/login");
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                toast.error(error.response.data.message || "Registration failed");
            } else {
                // Network error or no response
                toast.error("An error occurred");
            }
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-[#fcf5eb]"
        >
            <motion.div
                className="rounded-4xl border-2 border-gray-400 w-full max-w-lg shadow-2xl backdrop-blur-sm bg-white z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <form
                    onSubmit={handleSubmit}
                    className="px-4 py-4" >
                    <h2 className="text-2xl font-semibold text-center text-black p-4">
                        Register New Account
                    </h2>

                    <div className="p-2">
                        <label className="block mb-1 text-black">Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            placeholder="Enter your name"
                            required
                            className="input bg-gray-500 rounded-xl w-full"
                        />
                    </div>

                    <div className="p-2">
                        <label className="block mb-1 text-black">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            placeholder="you@example.com"
                            required
                            className="input bg-gray-500 rounded-xl w-full"
                        />
                    </div>

                    <div className="p-2">
                        <label className="block mb-1 text-black">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            placeholder="••••••••"
                            required
                            className="input bg-gray-500 rounded-xl w-full"
                        />
                    </div>

                    <div className="p-2">
                        <label className="block mb-1 text-black">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            placeholder="••••••••"
                            required
                            className="input bg-gray-500 rounded-xl w-full"
                        />
                    </div>

                    <div className="form-control mt-4">
                        <button className="w-full bg-green-500 py-[12px] rounded-4xl">
                            Register
                        </button>
                    </div>

                    <p className="text-center text-sm mt-2 text-black">
                        Do You have an account?{" "}
                        <Link to="/login" className="text-blue-700 hover:text-blue-900">
                            Login
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}
