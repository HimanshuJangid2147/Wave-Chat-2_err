import User from "../models/user.model.js";
import Message from "../models/message.model.js";
// import Conversation from "../models/conversation.model.js";
import cloudinary from 'cloudinary';

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    if (!filteredUsers.length) {
      return res.status(404).json({ error: "No users available" });
    }

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error In getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId }
      ]
    }).sort({ createdAt: 1 }); // Sort by time

    if (!messages.length) {
      return res.status(404).json({ error: "No messages found" });
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error In getMessages: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message: text,
      image: imageUrl,
    });

    await newMessage.save();

    // TODO: Emit event via Socket.io for real-time updates
    // io.to(receiverId).emit('newMessage', newMessage);

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error In sendMessages Controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
