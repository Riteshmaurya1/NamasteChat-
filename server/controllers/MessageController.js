import Conversation from "../models/ConversationMessagedb.js";
import Message from "../models/Messagedb.js";
export const sendMessage = async (req, res) => {
  console.log("Sent message Successfully...");
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // Current Logged In user

    // 1. Find or create the conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // Create a new conversation if it doesn't exist
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    // 2. Create the message
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    // 3. Add message to conversation
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json({
      message: "Message sent successfully",
      success: true,
      newMessage,
    });
  } catch (error) {
    console.error("Error in sending message" + error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

/* -------------------- Get Message from DB --------------------- */
export const getMessages = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id;

    // FOr Getting Old Messages
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }
    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.error("Error in getting message" + error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
