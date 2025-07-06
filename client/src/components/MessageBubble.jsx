// import React from "react";
// const MessageBubble = ({ text, isSender, time }) => {
    
//     return (
//         <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
//             <div
//                 className={`max-w-xs px-4 py-2 rounded-2xl text-sm relative
//           ${isSender
//                         ? "bg-green-700 text-white rounded-br-none border-2 border-gray-500 pb-3"
//                         : "bg-white text-black rounded-tl-none border-2 border-gray-100"
//                     }`}
//             >
//                 {text}

//                 <div className="flex items-center gap-1 absolute bottom-0.5 right-2">
//                     <span className="text-[8px] text-gray-200">{time}</span>
//                     {isSender && (
//                         <svg
//                             className="w-4 h-4 text-blue-700 text-xl"
//                             fill="currentColor"
//                             viewBox="0 0 24 24"
//                         >
//                             <path d="M1.5 13l4 4L14 8l-1.4-1.4L5.5 13l-2.1-2.1L1.5 13zm6 0l4 4L20 8l-1.4-1.4L13.5 13l-2.1-2.1L7.5 13z" />
//                         </svg>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MessageBubble;


// import React from "react";

// const MessageBubble = ({ text, isSender, time, senderColor }) => {
//   return (
//     <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
//       <div
//         className={`max-w-xs px-4 py-2 rounded-2xl text-sm relative border pb-4
//           ${isSender ? "text-white rounded-br-none border-gray-500" : "bg-white text-black rounded-tl-none border-gray-200"}
//         `}
//         style={isSender ? { backgroundColor: senderColor } : {}}
//       >
//         {text}

//         <div className="flex items-center gap-1 absolute bottom-1 right-2">
//           <span className={`text-[10px] ${isSender ? "text-gray-200" : "text-gray-400"}`}>
//             {time}
//           </span>
//           {isSender && (
//             <svg
//               className="w-4 h-4 text-blue-400"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M1.5 13l4 4L14 8l-1.4-1.4L5.5 13l-2.1-2.1L1.5 13zm6 0l4 4L20 8l-1.4-1.4L13.5 13l-2.1-2.1L7.5 13z" />
//             </svg>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageBubble;



import React from "react";

const MessageBubble = ({ text, isSender, time, bubbleColor }) => {
  const senderBg = {
    green: "bg-green-700",
    blue: "bg-blue-600",
    purple: "bg-purple-600",
    pink: "bg-pink-500",
    gray: "bg-gray-500",
  }[bubbleColor || "green"];

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl text-sm relative ${
          isSender
            ? `${senderBg} text-white rounded-br-none border-2 border-gray-500 pb-3`
            : "bg-white text-black rounded-tl-none border-2 border-gray-100"
        }`}
        style={{
    backgroundColor: isSender ? bubbleColor : undefined,
  }}
      >
        {text}
        <div className="flex items-center gap-1 absolute bottom-0.5 right-2">
          <span className="text-[8px] text-gray-200">{time}</span>
          {isSender && (
            <svg
              className="w-4 h-4 text-blue-700 text-xl"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M1.5 13l4 4L14 8l-1.4-1.4L5.5 13l-2.1-2.1L1.5 13zm6 0l4 4L20 8l-1.4-1.4L13.5 13l-2.1-2.1L7.5 13z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;



// --------------------------------------