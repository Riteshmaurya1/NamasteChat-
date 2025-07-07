// import React from 'react';
// import Navbar from '../components/Navbar';
// import Chat from './chat/Chat';
// import Aside from './aside/Aside';
// import AsideSearch from './aside/AsideSearch';
// import BottomSearch from '../components/BottomSearch';

// const Home = () => {
//     return (
//         <div className="flex h-screen overflow-hidden">
//             {/* Sidebar column */}
//             <aside className=" hidden md:flex flex-col w-64 bg-[#ddbff5] ">
//                 {/* Fixed search */}
//                 <div className="flex-shrink-0">
//                     <AsideSearch />
//                 </div>
//                 {/* Scrollable sidebar content */}
//                 <div className="flex-1 overflow-y-auto">
//                     <Aside />
//                 </div>
//             </aside>

//             {/* Main content column */}
//             <div className="flex flex-col flex-1 bg-[#fcf5eb] ">
//                 {/* Sticky navbar */}
//                 <header className="flex sticky top-0 z-10">
//                     <Navbar />
//                 </header>
//                 {/* Scrollable chat area */}
//                 <main className="flex-1 overflow-y-auto">
//                     <Chat />
//                 </main>
//                 {/* Bottom search bar */}
//                 <BottomSearch />
//             </div>
//         </div>
//     );
// };

// export default Home;



import React from 'react';
import Navbar from '../components/Navbar';
import Chat from './chat/Chat';
import Aside from './aside/Aside';
import AsideSearch from './aside/AsideSearch';
import BottomSearch from '../components/BottomSearch';
import useConversation from '../statemanage/useConversation';
import MobileBackHandler from '../components/MobileBackHandler';

const Home = () => {
    const { selectedConversation } = useConversation();

    return (
        <>
            <MobileBackHandler />
            <div className="flex h-screen overflow-hidden">
                {/* === ASIDE === */}
                <aside
                    className={`
          bg-[#ddbff5] w-full md:w-64 flex-col transition-all duration-300 
          ${selectedConversation ? 'hidden md:flex' : 'flex'}
        `}
                >
                    {/* Top search bar */}
                    <div className="flex-shrink-0">
                        <AsideSearch />
                    </div>

                    {/* User list */}
                    <div className="flex-1 overflow-y-auto">
                        <Aside />
                    </div>
                </aside>

                {/* === MAIN CHAT === */}
                <div
                    className={`
          flex flex-col flex-1 bg-[#fcf5eb] transition-all duration-300
          ${selectedConversation ? 'flex' : 'hidden md:flex'}
        `}
                >
                    {/* Sticky navbar */}
                    <header className="sticky top-0 z-10">
                        <Navbar />
                    </header>

                    {/* Chat area */}
                    <main className="flex-1 overflow-y-auto">
                        <Chat />
                    </main>

                    {/* Message input */}
                    <BottomSearch />
                </div>
            </div>
        </>
    );
};

export default Home;
