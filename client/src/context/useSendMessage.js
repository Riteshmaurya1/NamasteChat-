// import { useState } from "react";
// import axios from "axios";
// import useConversation from "../statemanage/useConversation.js";
// import { useEffect } from "react";

// const useSendMessage = () => {
//   const [loading, setLoading] = useState(false);
//   const { selectedConversation, setMessages } = useConversation();

//   // useEffect(() => {
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

//       // Always fallback to [] if prev is undefined
//       setMessages((prev) => [...(prev || []), res.data.newMessage]);
//       // setMessages([...messageText, res.data]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // sendMessage();
//   // }, []);
//   return { sendMessage, loading };
// };

// export default useSendMessage;

import { useState } from "react";
import axios from "axios";
import useConversation from "../statemanage/useConversation.js";
import { useEffect } from "react";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, selectedConversation, setMessages } = useConversation();

  // useEffect(() => {
  const sendMessage = async (message) => {
    if (!selectedConversation || !selectedConversation._id) {
      console.warn("No conversation selected");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/message/send/${selectedConversation._id}`,
        { message: message },
        { withCredentials: true }
      );

      // Always fallback to [] if prev is undefined
      // setMessages((prev) => [...(prev || []), res.data.newMessage]);
      setMessages([...messages, res.data]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };
  // sendMessage();
  // }, []);
  return { sendMessage, loading };
};

export default useSendMessage;
