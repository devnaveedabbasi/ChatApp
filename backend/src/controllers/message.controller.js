import { User } from "../models/auth.model.js";
import { ApiError } from "../utlis/apiError.js";
import { ApiResponse } from "../utlis/apiResponse.js";
import asyncHandler from "../utlis/asyncHandler.js";
import {uploadOnCloudinary} from '../utlis/fileUpload.js'
import Message from '../models/message.model.js'
import {FriendModel} from '../models/friendRequest.modal.js'

export const getUserForSidebar = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;

  // ✅ Corrected query based on your Friend model
  const friends = await FriendModel.find({
    $or: [
      { sender: loggedInUserId },
      { receiver: loggedInUserId }
    ],
    status: "accepted",
  });

  // ✅ Extract IDs of friends
  const friendUserIds = friends.map(friend => {
    return friend.sender.toString() === loggedInUserId.toString()
      ? friend.receiver
      : friend.sender;
  });

  // ✅ Fetch user details excluding password & refreshToken
  const filteredUsers = await User.find({ _id: { $in: friendUserIds } }).select(
    "-password -refreshToken"
  );

  // ✅ Fetch last message per user
  const usersWithLastMessage = await Promise.all(
    filteredUsers.map(async (user) => {
      const lastMessage = await Message.findOne({
        $or: [
          { senderId: loggedInUserId, receiverId: user._id },
          { senderId: user._id, receiverId: loggedInUserId },
        ],
      })
        .sort({ createdAt: -1 })
        .limit(1);

      return {
        ...user._doc,
        lastMessage: lastMessage ? lastMessage.text : null,
        messageType: lastMessage
          ? lastMessage.senderId.toString() === loggedInUserId.toString()
            ? "sent"
            : "received"
          : null,
      };
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, usersWithLastMessage, "Successfully fetched friends"));
});





export const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;
  const myId = req.user._id;

  console.log("Fetching messages between:", myId, "and", userToChatId);


  await Message.updateMany(
  {
    senderId: userToChatId,
    receiverId: myId,
    isSeen: false,
  },
  { $set: { isSeen: true } }
);


  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  });

 
req.app.get('io').emit("messageSeen", {
  userId: myId,
  seenFromUserId: userToChatId, 
});


  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Successfully fetched messages"));
});




export const sendMessage = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const image = req.file?.path;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  const isFriend = await FriendModel.findOne({
    $or: [
      { user1: senderId, user2: receiverId, status: "accepted" },
      { user1: receiverId, user2: senderId, status: "accepted" },
    ],
  });

  if (!isFriend) {
    return res
      .status(403)
      .json(new ApiResponse(403, null, "You are not friends with this user"));
  }

  let imageUrl;
  if (image) {
    const uploadResponse = await uploadOnCloudinary(image);
    imageUrl = uploadResponse.secure_url;
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  await newMessage.save();

  req.app.get("io").emit("newMessage", newMessage);
  req.app.get("io").emit("lastMessageUpdate", {
    senderId: req.user._id,
    receiverId: receiverId,
    message: newMessage,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newMessage, "Send Message successfully"));
});



