// import { useState } from "react";
// import axios from "axios";
// import useConversation from "../statemanage/useConversation";

// const useSendMessage = () => {
//   const [loading, setLoading] = useState(false);
//   const { selectedConversation, setMessages } = useConversation();

//   const sendMessage = async (messageText) => {
//     if (!selectedConversation || !selectedConversation._id) {
//       console.warn("No conversation selected");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         `http://localhost:3000/api/message/send/${selectedConversation._id}`,
//         { message: messageText },
//         { withCredentials: true }
//       );

//       // Append the new message to the messages array
//       setMessages((prev) => [...prev, res.data.newMessage]);

//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { sendMessage, loading };
// };

// export default useSendMessage;

import { useState } from "react";
import axios from "axios";
import useConversation from "../statemanage/useConversation";
import { useEffect } from "react";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, setMessages } = useConversation();

  const sendMessage = async (messageText) => {
    if (!selectedConversation || !selectedConversation._id) {
      console.warn("No conversation selected");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/message/send/${selectedConversation._id}`,
        { message: messageText },
        { withCredentials: true }
      );

      // Always fallback to [] if prev is undefined
      setMessages((prev) => [...(prev || []), res.data.newMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
