import { User } from "../models/auth.model.js";
import { ApiError } from "../utlis/apiError.js";
import { ApiResponse } from "../utlis/apiResponse.js";
import asyncHandler from "../utlis/asyncHandler.js";
import {uploadOnCloudinary} from '../utlis/fileUpload.js'
import Message from '../models/message.model.js'

export const getUserForSidebar = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;

  const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
    "-password -refreshToken"
  );

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
    .json(new ApiResponse(200, usersWithLastMessage, "Successfully fetched"));
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



export const sendMessage=asyncHandler(async(req,res)=>{

    const {text}=req.body
  const image = req.file?.path;  

    const {id:receiverId}=req.params

    const senderId=req.user._id

    let imageUrl

    if(image){
        const uploadResponse=await uploadOnCloudinary(image)
        imageUrl=uploadResponse.secure_url
    }

    const newMessage=new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl
    })
        req.app.get('io').emit('newMessage', newMessage);  
req.app.get('io').emit("lastMessageUpdate", {
  senderId: req.user._id,
  receiverId: receiverId,
  message: newMessage, 
});
    await newMessage.save()

    return res.status(200).json(new ApiResponse(200,newMessage,"Send Message succesfuly"))
})


