import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SearchWaves } from "@mynaui/icons-react";
import { AppContext } from '../context/AppContext';
import useConversation from '../statemanage/useConversation.js';


const Navbar = () => {
    const { selectedConversation } = useConversation();
    // console.log("This is selected user anem := ",selectedConversation.name);
    
    return (
        <div className="navbar shadow-sm bg-transparent backdrop-blur-2xl rounded-2xl p-4">
            <div className="flex-1 gap-2 items-center justify-center">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="size-10 rounded-full bg-black text-white flex items-center pt-1 justify-center text-xl font-semibold uppercase">
                            {selectedConversation?.name
                                ? selectedConversation.name.slice(0, 2)
                                : "U"}
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu left-0 top-8 menu-sm dropdown-content bg-gray-700 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                <Link to='/profile'> Profile</Link>
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a><Link to='/settings'>Settings</Link></a></li>
                        {/* <li><a><Link to='/logout' onClick={logout}>Logout</Link></a></li> */}
                    </ul>
                </div>
                <span className='text-black text-xl font-semibold'> {selectedConversation?.name || "No user selected"}</span>
            </div>
            <div className=" hidden md:flex gap-2 items-center justify-center">
                <input
                    type="text"
                    placeholder="Search In Chats"
                    className="input w-50 md:w-auto rounded-4xl bg-gray-700" />
                <SearchWaves className='text-gray-700 size-8' />
            </div>
        </div>
    )
}

export default Navbar