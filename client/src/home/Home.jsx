import React from 'react';
import Navbar from '../components/Navbar';
import Chat from './chat/Chat';
import Aside from './Aside/aside';
import AsideSearch from './aside/AsideSearch';
import BottomSearch from '../components/BottomSearch';

const Home = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar column */}
            <aside className=" hidden md:flex flex-col w-64 bg-[#ddbff5] ">
                {/* Fixed search */}
                <div className="flex-shrink-0">
                    <AsideSearch />
                </div>
                {/* Scrollable sidebar content */}
                <div className="flex-1 overflow-y-auto">
                    <Aside />
                </div>
            </aside>

            {/* Main content column */}
            <div className="flex flex-col flex-1 bg-[#fcf5eb] ">
                {/* Sticky navbar */}
                <header className="flex sticky top-0 z-10">
                    <Navbar />
                </header>
                {/* Scrollable chat area */}
                <main className="flex-1 overflow-y-auto">
                    <Chat />
                </main>
                {/* Bottom search bar */}
                <BottomSearch />
            </div>
        </div>
    );
};

export default Home;
