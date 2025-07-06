import React, { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { RiVoiceAiFill } from "react-icons/ri";
import useSendMessage from "../context/useSendMessage.js";

const BottomSearch = () => {
  const [newMessage, setNewMessage] = useState("");
  const { sendMessage, loading } = useSendMessage();

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(newMessage);
    setNewMessage(""); // Clear input
  };

  return (
    <div className="w-full bg-transparent">
      <div className="flex items-center gap-2 max-w-4xl mx-auto bg-white p-2 rounded-2xl">
        <button
          className="bg-[#374254] text-white hidden md:flex size-10 px-3 py-3 shadow-2xl rounded-xl hover:bg-black/90 transition"
        >
          <FiLink />
        </button>
        <button className="bg-[#374254] text-white size-10 px-3 py-3 shadow-2xl rounded-xl hover:bg-black/90 transition">
          <MdOutlineAddPhotoAlternate />
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-1 bg-[#374254] border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:border-[#fcf5eb] transition text-white"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-[#374254] text-white size-10 px-3 py-3 shadow-2xl rounded-xl hover:bg-black/90 transition disabled:opacity-50"
        >
          <BsFillSendFill />
        </button>
        <button className="hidden md:flex bg-[#374254] text-white size-10 px-3 py-3 shadow-2xl rounded-xl hover:bg-black/90 transition">
          <RiVoiceAiFill />
        </button>
      </div>
    </div>
  );
};

export default BottomSearch;
