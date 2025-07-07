// // import React, { useContext } from "react";
// // import MessageBubble from "../../components/MessageBubble";
// // import useGetMessage from "../../context/useGetMessage";
// // import Loading from "../../components/Loading";
// // import { AppContext } from "../../context/AppContext";
// // import { SearchCheck, SearchCircle, SearchWaves } from "@mynaui/icons-react";

// // // Helper to format date labels safely
// // function formatDateLabel(dateStr) {
// //   const msgDate = dateStr ? new Date(dateStr) : null;

// //   if (!msgDate || isNaN(msgDate)) return ""; // Don't show anything

// //   const today = new Date();
// //   const diffTime = today - msgDate;
// //   const diffDays = diffTime / (1000 * 60 * 60 * 24);

// //   if (diffDays < 1) return "Today";
// //   if (diffDays < 2) return "Yesterday";
// //   return msgDate.toLocaleDateString();
// // }

// // const Chat = () => {
// //   const { messages, loading } = useGetMessage();
// //   const myUserId = localStorage.getItem("userId");
// //   const { wallpaper, bubbleColor, searchInChat } = useContext(AppContext);

// //   if (loading) {
// //     return <Loading />;
// //   }

// //   // const safeMessages = Array.isArray(messages) ? messages : [];

// //   const safeMessages = Array.isArray(messages) ? messages : [];

// //   const filteredMessages = searchInChat.trim()
// //     ? safeMessages.filter((msg) =>
// //       msg.message?.toLowerCase().includes(searchInChat.toLowerCase())
// //     )
// //     : safeMessages;

// //   if (filteredMessages.length === 0) {
// //     if (searchInChat.trim()) {
// //       // When user is searching but nothing matches
// //       return (
// //         <div className="flex flex-col items-center justify-center w-full min-h-screen">
// //           <div className="text-6xl animate-bounce text-black">
// //             <SearchWaves className='text-gray-700 size-8' />
// //           </div>
// //           <p className="mt-4 text-xl text-gray-700 font-medium">
// //             No messages found for "{searchInChat}"
// //           </p>
// //         </div>
// //       );
// //     } else {
// //       // No messages at all (new chat)
// //       return (
// //         <div className="flex flex-col items-center justify-center w-full min-h-screen">
// //           <div className="text-6xl animate-bounce">👋</div>
// //           <p className="mt-4 text-xl text-gray-700 font-medium">
// //             Say Hii to start the conversation!
// //           </p>
// //         </div>
// //       );
// //     }
// //   }


// //   // const sortedMessages = [...safeMessages].sort(
// //   //   (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
// //   // );

// //   let lastDate = null;

// //   return (
// //     <div
// //       id="chat-container"
// //       className="space-y-2 p-2 min-h-screen"
// //       style={{
// //         backgroundImage: wallpaper ? `url(${wallpaper})` : "none",
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         backgroundAttachment: "fixed",
// //       }}
// //     >
// //       {/* {sortedMessages.map((msg) => { */}
// //       {[...filteredMessages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((msg) => {
// //         const rawDate = msg.createdAt;
// //         const dateObj = rawDate ? new Date(rawDate) : null;
// //         const isValidDate = dateObj && !isNaN(dateObj);

// //         // check for system messages
// //         if (
// //           msg.sender === "system" ||          // example system identifier
// //           msg.message?.toLowerCase().includes("message sent successfully")
// //         ) {
// //           return null; // skip rendering this message
// //         }

// //         const msgDate = isValidDate ? rawDate.split("T")[0] : null;
// //         const showDateLabel = msgDate && msgDate !== lastDate;

// //         if (msgDate) lastDate = msgDate;

// //         return (
// //           <React.Fragment key={msg._id}>
// //             {showDateLabel && (
// //               <div className="flex justify-center my-4">
// //                 <span className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full">
// //                   {formatDateLabel(msgDate)}
// //                 </span>
// //               </div>
// //             )}
// //             <MessageBubble
// //               text={msg.message}
// //               time={
// //                 isValidDate
// //                   ? dateObj.toLocaleTimeString([], {
// //                     hour: "2-digit",
// //                     minute: "2-digit",
// //                   })
// //                   : ""
// //               }
// //               isSender={msg.sender === myUserId}
// //               bubbleColor={bubbleColor}
// //             />
// //           </React.Fragment>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default Chat;


// import React, { useContext } from "react";
// import MessageBubble from "../../components/MessageBubble";
// import useGetMessage from "../../context/useGetMessage";
// import Loading from "../../components/Loading";
// import { AppContext } from "../../context/AppContext";
// import { SearchWaves } from "@mynaui/icons-react";
// import useConversation from "../../statemanage/useConversation";
// import { ArrowLeft } from "lucide-react";

// function formatDateLabel(dateStr) {
//   const msgDate = dateStr ? new Date(dateStr) : null;

//   if (!msgDate || isNaN(msgDate)) return "";

//   const today = new Date();
//   const diffTime = today - msgDate;
//   const diffDays = diffTime / (1000 * 60 * 60 * 24);

//   if (diffDays < 1) return "Today";
//   if (diffDays < 2) return "Yesterday";
//   return msgDate.toLocaleDateString();
// }

// const Chat = () => {
//   const { messages, loading } = useGetMessage();
//   const myUserId = localStorage.getItem("userId");
//   const { wallpaper, bubbleColor, searchInChat, setSearchInChat } = useContext(AppContext);
//   const { setSelectedConversation } = useConversation();
//   const isMobile = window.innerWidth < 768;

//   if (loading) {
//     return <Loading />;
//   }

//   const safeMessages = Array.isArray(messages) ? messages : [];

//   const filteredMessages = searchInChat.trim()
//     ? safeMessages.filter((msg) =>
//         msg.message?.toLowerCase().includes(searchInChat.toLowerCase())
//       )
//     : safeMessages;

//   if (filteredMessages.length === 0) {
//     if (searchInChat.trim()) {
//       return (
//         <div className="flex flex-col items-center justify-center w-full min-h-screen">
//           <div className="text-6xl animate-bounce text-black">
//             <SearchWaves className='text-gray-700 size-8' />
//           </div>
//           <p className="mt-4 text-xl text-gray-700 font-medium">
//             No messages found for "{searchInChat}"
//           </p>
//         </div>
//       );
//     } else {
//       return (
//         <div className="flex flex-col items-center justify-center w-full min-h-screen">
//           <div className="text-6xl animate-bounce">👋</div>
//           <p className="mt-4 text-xl text-gray-700 font-medium">
//             Say Hii to start the conversation!
//           </p>
//         </div>
//       );
//     }
//   }

//   let lastDate = null;

//   return (
//     <div
//       id="chat-container"
//       className="space-y-2 p-2 min-h-screen"
//       style={{
//         backgroundImage: wallpaper ? `url(${wallpaper})` : "none",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//       onClick={() => {
//         if (searchInChat) setSearchInChat("");
//       }}
//     >
//       {isMobile && (
//         <div className="p-2 bg-white shadow">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedConversation(null);
//             }}
//             className="flex items-center gap-1 text-sm text-blue-500"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Users
//           </button>
//         </div>
//       )}

//       {[...filteredMessages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((msg) => {
//         const rawDate = msg.createdAt;
//         const dateObj = rawDate ? new Date(rawDate) : null;
//         const isValidDate = dateObj && !isNaN(dateObj);

//         if (
//           msg.sender === "system" ||
//           msg.message?.toLowerCase().includes("message sent successfully")
//         ) {
//           return null;
//         }

//         const msgDate = isValidDate ? rawDate.split("T")[0] : null;
//         const showDateLabel = msgDate && msgDate !== lastDate;

//         if (msgDate) lastDate = msgDate;

//         return (
//           <React.Fragment key={msg._id}>
//             {showDateLabel && (
//               <div className="flex justify-center my-4">
//                 <span className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full">
//                   {formatDateLabel(msgDate)}
//                 </span>
//               </div>
//             )}
//             <MessageBubble
//               text={msg.message}
//               time={
//                 isValidDate
//                   ? dateObj.toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })
//                   : ""
//               }
//               isSender={msg.sender === myUserId}
//               bubbleColor={bubbleColor}
//             />
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );
// };

// export default Chat;



import React, { useContext } from "react";
import MessageBubble from "../../components/MessageBubble";
import useGetMessage from "../../context/useGetMessage";
import Loading from "../../components/Loading";
import { AppContext } from "../../context/AppContext";
import { SearchWaves } from "@mynaui/icons-react";
import useConversation from "../../statemanage/useConversation";

function formatDateLabel(dateStr) {
  const msgDate = dateStr ? new Date(dateStr) : null;
  if (!msgDate || isNaN(msgDate)) return "";

  const today = new Date();
  const diffTime = today - msgDate;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays < 1) return "Today";
  if (diffDays < 2) return "Yesterday";
  return msgDate.toLocaleDateString();
}

const Chat = () => {
  const { messages, loading } = useGetMessage();
  const myUserId = localStorage.getItem("userId");
  const { wallpaper, bubbleColor, searchInChat } = useContext(AppContext);
  const { selectedConversation, setSelectedConversation } = useConversation();

  if (loading) return <Loading />;

  const safeMessages = Array.isArray(messages) ? messages : [];

  const filteredMessages = searchInChat.trim()
    ? safeMessages.filter((msg) =>
        msg.message?.toLowerCase().includes(searchInChat.toLowerCase())
      )
    : safeMessages;

  if (filteredMessages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        {searchInChat ? (
          <>
            <SearchWaves className="text-gray-700 size-8 animate-bounce" />
            <p className="mt-4 text-xl text-gray-700 font-medium">
              No messages found for "{searchInChat}"
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl animate-bounce">👋</div>
            <p className="mt-4 text-xl text-gray-700 font-medium">
              Say Hii to start the conversation!
            </p>
          </>
        )}
      </div>
    );
  }

  let lastDate = null;

  return (
    <div
      id="chat-container"
      className="space-y-2 p-2 min-h-screen relative"
      style={{
        backgroundImage: wallpaper ? `url(${wallpaper})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ✅ Mobile Back Button */}
      {selectedConversation && (
        <div className="md:hidden px-2 pb-2">
          <button
            onClick={() => setSelectedConversation(null)}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg shadow"
          >
            <span className="text-lg">←</span> Back to Chats
          </button>
        </div>
      )}

      {[...filteredMessages]
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((msg) => {
          const rawDate = msg.createdAt;
          const dateObj = rawDate ? new Date(rawDate) : null;
          const isValidDate = dateObj && !isNaN(dateObj);

          if (
            msg.sender === "system" ||
            msg.message?.toLowerCase().includes("message sent successfully")
          )
            return null;

          const msgDate = isValidDate ? rawDate.split("T")[0] : null;
          const showDateLabel = msgDate && msgDate !== lastDate;
          if (msgDate) lastDate = msgDate;

          return (
            <React.Fragment key={msg._id}>
              {showDateLabel && (
                <div className="flex justify-center my-4">
                  <span className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full">
                    {formatDateLabel(msgDate)}
                  </span>
                </div>
              )}
              <MessageBubble
                text={msg.message}
                time={
                  isValidDate
                    ? dateObj.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""
                }
                isSender={msg.sender === myUserId}
                bubbleColor={bubbleColor}
              />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Chat;
