import React, { useState, useEffect } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const GetMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/message/get/${selectedConversation._id}`,
            {
              withCredentials: true,
            }
          );
          console.log("==== RAW RESPONSE ====", response);
          console.log("==== RESPONSE.DATA ====", response.data);
          setMessages(response.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in useGetMessage: ", error);
        }
      }
    };
    GetMessages();
  }, [selectedConversation, setMessages]);
  return {
    messages,
    loading,
  };
};

export default useGetMessage;
