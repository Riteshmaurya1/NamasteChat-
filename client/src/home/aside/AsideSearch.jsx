import React from 'react'
import { SearchWaves } from "@mynaui/icons-react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const AsideSearch = () => {
    return (
        <div className="relative w-full gap-1 bg-white p-0.5 rounded-b-xl">
            <div className='p-1'>
                <input
                    type="text"
                    placeholder="Search in chats"
                    className="w-[85%] p-1 pl-3 pr-3 rounded-2xl bg-gray-700 text-white placeholder-gray-300
                     focus:outline-none focus:ring-2 focus:ring-gray-300 hover:text-gray-200"
                />
                {/* Icon inside */}
                <SearchWaves
                    className="size-8 hover:text-black text-[#374254] absolute right-2 top-6 cursor-pointer transform -translate-y-1/2 "
                />
            </div>
            <div className='flex cursor-pointer gap-1 justify-between items-center pl-2 pr-2 p-1 hover:bg-gray-400 hover:rounded-xl hover:w-full'>
                <span className="text-sm text-black font-semibold">
                    Create A Group
                </span>
                <span className="text-xl text-black">
                    <AiOutlineUsergroupAdd />
                </span>
            </div>

        </div>
    )
}

export default AsideSearch;