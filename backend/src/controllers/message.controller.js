import { User } from "../models/auth.model.js";
import { ApiError } from "../utlis/apiError.js";
import { ApiResponse } from "../utlis/apiResponse.js";
import asyncHandler from "../utlis/asyncHandler.js";
import {uploadOnCloudinary} from '../utlis/fileUpload.js'
import Message from '../models/message.model.js'

export const getUserForSidebar=asyncHandler(async(req,res)=>{
    const loggedInUserId=req.user._id

    const filteredUser=await User.find({_id:{$ne:loggedInUserId}}).select("-password -refreshToken")

    return res.status(200).json(new ApiResponse(200,filteredUser,"succesfulyy fettch"))
})


export const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;
  const myId = req.user._id;

  console.log("Fetching messages between:", myId, "and", userToChatId);

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
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

    await newMessage.save()

    return res.status(200).json(new ApiResponse(200,newMessage,"Send Message succesfuly"))
})


