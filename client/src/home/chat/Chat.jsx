// import React, { useContext } from "react";
// import MessageBubble from "../../components/MessageBubble";
// import useGetMessage from "../../context/useGetMessage";
// import Loading from "../../components/Loading";
// import { AppContext } from "../../context/AppContext";

// // Helper to format date labels
// function formatDateLabel(dateStr) {
//   const today = new Date();
//   const msgDate = new Date(dateStr);
//   const diffTime = today - msgDate;
//   const diffDays = diffTime / (1000 * 60 * 60 * 24);

//   if (diffDays < 1) return "Today";
//   if (diffDays < 2) return "Yesterday";
//   return msgDate.toLocaleDateString();
// }

// const Chat = () => {
//   const { messages, loading } = useGetMessage();
//   const myUserId = localStorage.getItem("userId");

//   // Just READ these from context, no setters here
//   const { wallpaper, bubbleColor } = useContext(AppContext);
//   console.log(bubbleColor);


//   if (loading) {
//     return <Loading />;
//   }

//   if (!messages || (Array.isArray(messages) && messages.length === 0)) {
//     return (
//       <div
//         className="flex flex-col items-center justify-center w-full min-h-screen"
//       >
//         <div className="text-6xl animate-bounce">👋</div>
//         <p className="mt-4 text-xl text-gray-700 font-medium">
//           Say Hii to start the conversation!
//         </p>
//       </div>
//     );
//   }

//   if (!Array.isArray(messages)) {
//     return (
//       <div className="flex justify-center items-center h-32 text-red-500">
//         ERROR: Messages is not an array
//       </div>
//     );
//   }

//   // Sort messages by date
//   const sortedMessages = [...messages].sort(
//     (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//   );

//   let lastDate = null;

//   return (
//     <div
//       className="space-y-2 p-2 min-h-screen"
//       style={{
//         backgroundImage: wallpaper ? `url(${wallpaper})` : "none",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       {sortedMessages.map((msg) => {
//         const msgDate = msg.createdAt.split("T")[0];
//         const showDateLabel = msgDate !== lastDate;
//         lastDate = msgDate;

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
//               time={new Date(msg.createdAt).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
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



// import React, { useContext } from "react";
// import MessageBubble from "../../components/MessageBubble";
// import useGetMessage from "../../context/useGetMessage";
// import Loading from "../../components/Loading";
// import { AppContext } from "../../context/AppContext";

// // Helper to format date labels
// function formatDateLabel(dateStr) {
//   const today = new Date();
//   const msgDate = new Date(dateStr);
//   const diffTime = today - msgDate;
//   const diffDays = diffTime / (1000 * 60 * 60 * 24);

//   if (diffDays < 1) return "Today";
//   if (diffDays < 2) return "Yesterday";
//   return msgDate.toLocaleDateString();
// }

// const Chat = () => {
//   const { messages, loading } = useGetMessage();
//   const myUserId = localStorage.getItem("userId");
//   const { wallpaper, bubbleColor } = useContext(AppContext);

//   if (loading) {
//     return <Loading />;
//   }

//   // Fallback safely: if messages undefined/null, show empty state
//   const safeMessages = Array.isArray(messages) ? messages : [];

//   if (safeMessages.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center w-full min-h-screen">
//         <div className="text-6xl animate-bounce">👋</div>
//         <p className="mt-4 text-xl text-gray-700 font-medium">
//           Say Hii to start the conversation!
//         </p>
//       </div>
//     );
//   }

//   // Sort messages by date
//   const sortedMessages = [...safeMessages].sort(
//     (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//   );

//   const handleSend = async () => {
//     if (!messages.trim()) return;
//     await sendMessage(messages);
//     setNewMessage("");

//     // scroll to bottom if new messages
//     const chatContainer = document.getElementById("chat-container");
//     if (chatContainer) {
//       chatContainer.scrollTop = chatContainer.scrollHeight;
//     }
//   };

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
//     >
//       {sortedMessages.map((msg) => {
//         const msgDate = msg.createdAt.split("T")[0];
//         // const msgDate = msg.createdAt
//         //   ? msg.createdAt.split("T")[0]
//         //   : "Unknown";

//         const showDateLabel = msgDate !== lastDate;
//         lastDate = msgDate;

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
//               time={new Date(msg.createdAt).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
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

// Helper to format date labels safely
function formatDateLabel(dateStr) {
  const msgDate = dateStr ? new Date(dateStr) : null;

  if (!msgDate || isNaN(msgDate)) return ""; // Don't show anything

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
  const { wallpaper, bubbleColor } = useContext(AppContext);

  if (loading) {
    return <Loading />;
  }

  const safeMessages = Array.isArray(messages) ? messages : [];

  if (safeMessages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        <div className="text-6xl animate-bounce">👋</div>
        <p className="mt-4 text-xl text-gray-700 font-medium">
          Say Hii to start the conversation!
        </p>
      </div>
    );
  }

  const sortedMessages = [...safeMessages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  let lastDate = null;

  return (
    <div
      id="chat-container"
      className="space-y-2 p-2 min-h-screen"
      style={{
        backgroundImage: wallpaper ? `url(${wallpaper})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {sortedMessages.map((msg) => {
        const rawDate = msg.createdAt;
        const dateObj = rawDate ? new Date(rawDate) : null;
        const isValidDate = dateObj && !isNaN(dateObj);

        // check for system messages
        if (
          msg.sender === "system" ||          // example system identifier
          msg.message?.toLowerCase().includes("message sent successfully")
        ) {
          return null; // skip rendering this message
        }

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
