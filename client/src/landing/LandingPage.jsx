import React from "react";
import { RiDownloadLine, RiArrowRightSLine } from "react-icons/ri";
import { chat1, chat2, chat3, chat4, chat5, landingImg } from "../assets/images";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const LandingPage = () => {

    const imageVariants = {
        hidden: (direction) => ({
            opacity: 0,
            x: direction === "left" ? -100 : 100,
        }),
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 50,
            },
        },
    };


    return (
        <>
            <div className="min-h-screen bg-[#fcf5eb] flex flex-col overflow-auto hide-scrollbar">
                {/* Header */}
                <header className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md shadow-sm border-b border-amber-50 py-4 px-6 flex items-center justify-between z-50">
                    <div className="flex items-center gap-1">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                            alt="App Logo"
                            className="h-10 w-10"
                        />
                        <span className="text-xl font-bold text-green-500 cursor-pointer">
                            MyChatApp
                        </span>
                    </div>
                    <div className="flex gap-4 ">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-white text-black hover:text-white text-[19px] px-8 py-3 rounded-full border-black border-2 hover:bg-black">
                            <Link to='/login'>Log in</Link>
                            <RiArrowRightSLine className="font-semibold text-xl" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-green-500 text-black hover:text-white text-[19px] px-8 py-3 rounded-full border-black border-2 hover:bg-black">
                            Download
                            <RiDownloadLine className="font-semibold text-xl" />
                        </motion.button>
                    </div>
                </header>

                {/* Hero  */}
                <main className="relative w-full h-[700px] rounded-3xl overflow-hidden mt-30">
                    {/* Image background */}
                    <img
                        src={landingImg}
                        alt="Chat Background"
                        className="absolute w-full h-[110%] object-fill"
                    />

                    {/* Overlay content */}
                    <div className="absolute top-50 left-30 z-10 max-w-md text-left">
                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-5">
                            Message <br /> privately <br />
                        </h1>
                        <p className="text-gray-200 text-xl font-semibold mb-4 gap-2">
                            With MyChatApp, you can message and call your friends and family
                            for free*, no matter where they are.
                        </p>
                        <div className=" absolute top-80 left-0">
                            <div className="flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 bg-green-500 text-black hover:text-white text-[19px] px-8 py-3 rounded-full border-black border-2 hover:bg-black">
                                    Download
                                    <RiDownloadLine className=" font-semibold text-xl" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-white text-black hover:text-white text-[19px] px-8 py-3 rounded-full border-black border-2 hover:bg-black">
                                    <Link to='/login'>Log in</Link>
                                    <RiArrowRightSLine className="font-semibold text-2xl " />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-20 right-30 z-10 max-w-md text-left">
                        {[chat1, chat2, chat3, chat5, chat4].map((src, index) => (
                            <motion.img
                                key={index}
                                src={src}
                                alt={`Chat ${index + 1}`}
                                className="p-1"
                                initial={{
                                    opacity: 0,
                                    x: index % 2 === 0 ? -100 : 100,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                transition={{
                                    delay: index * 0.8,
                                    duration: 0.8,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center py-6 text-gray-500 text-sm">
                    © {new Date().getFullYear()} MyChatApp. All rights reserved.
                </footer>
            </div>
        </>
    );
};

export default LandingPage;
