import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

export default function LoginCard() {
    const navigate = useNavigate();
    const { login } = useContext(AppContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Call login logic in context
        await login(formData.email, formData.password, navigate);

        // Reset form fields (this part stays in component)
        setFormData({
            email: "",
            password: "",
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#fcf5eb]">
            <motion.div
                className="rounded-4xl border-2 border-gray-400 w-full max-w-sm shadow-2xl backdrop-blur-sm bg-white z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <form onSubmit={handleSubmit} className="max-w-screen px-4 py-4">
                    <h2 className="text-2xl font-semibold text-center text-black p-4">
                        Login Account
                    </h2>
                    <div className="p-2">
                        <label className="label">
                            <span className="label-text text-black">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            required
                            placeholder="you@example.com"
                            className="input bg-gray-500 rounded-xl"
                        />
                    </div>

                    <div className="p-2">
                        <label className="label">
                            <span className="label-text text-black">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            required
                            placeholder="••••••••"
                            className="input bg-gray-500 rounded-xl"
                        />
                        <label className="label">
                            <a href="#" className="label-text-alt text-blue-700 link link-hover">
                                Forgot password?
                            </a>
                        </label>
                    </div>

                    <div className="form-control mt-4">
                        <button className="w-full bg-green-500 py-[12px] rounded-4xl">
                            Login
                        </button>
                    </div>

                    <p className="text-center text-sm mt-2 text-black">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-blue-700 hover:text-blue-900">
                            Register
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}
