import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SearchWaves } from "@mynaui/icons-react";
import useConversation from '../statemanage/useConversation.js';
import { useSocketContext } from '../context/SocketContext';
import { AppContext } from '../context/AppContext.jsx';

const Navbar = () => {
    const { selectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();
    const { searchInChat, setSearchInChat } = useContext(AppContext);
    const [tempSearch, setTempSearch] = useState("");

    const searchRef = useRef(null); // 🔁 to track clicks outside

    const isUserOnline =
        selectedConversation?._id &&
        Array.isArray(onlineUsers) &&
        onlineUsers.includes(selectedConversation._id);

    const handleSearch = () => {
        setSearchInChat(tempSearch.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
        if (e.key === "Escape") {
            setTempSearch("");
            setSearchInChat("");
        }
    };

    // 🔁 Detect clicks outside and reset search
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setTempSearch("");
                setSearchInChat("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar shadow-sm bg-transparent backdrop-blur-2xl rounded-2xl p-4">
            <div className="flex-1 gap-2 items-center justify-center">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="relative inline-block" style={{ overflow: 'visible' }}>
                            <div className="size-10 rounded-full bg-black text-white flex items-center pt-1 justify-center text-xl font-semibold uppercase">
                                {selectedConversation?.name
                                    ? selectedConversation.name.slice(0, 2)
                                    : "U"}
                            </div>

                            {selectedConversation && (
                                <span
                                    className={`absolute left-17 -translate-x-1/2 top-7 mt-1 text-xs font-medium ${isUserOnline ? "text-green-500" : "text-gray-400"}`}
                                >
                                    {isUserOnline ? "Online" : "Offline"}
                                </span>
                            )}
                        </div>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu left-0 top-8 menu-sm dropdown-content bg-gray-700 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a className="justify-between">
                                <Link to='/profile'> Profile</Link>
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <a><Link to='/settings'>Settings</Link></a>
                        </li>
                    </ul>
                </div>

                <span className='text-black text-xl font-semibold gap-2 pl-2'>
                    {selectedConversation?.name || "No user selected"}
                </span>
            </div>

            {/* 🟢 Wrap the input + icon with ref for click detection */}
            <div ref={searchRef} className="flex gap-2 items-center justify-center">
                <input
                    type="text"
                    placeholder="Search In Chats"
                    value={tempSearch}
                    onChange={(e) => setTempSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="input w-50 md:w-auto rounded-4xl bg-gray-700 text-white placeholder-gray-300"
                />

                <button onClick={handleSearch}>
                    <SearchWaves className="text-gray-700 size-8 cursor-pointer" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
