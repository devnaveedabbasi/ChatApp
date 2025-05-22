import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [image,setImage]=useState("")
  const fileInputRef = useRef(null);
  const { sendMessages,isSendMessageLoading } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file)
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!text.trim() && !image) return;

  try {
    const formData = new FormData();
    formData.append("text", text.trim());
    if (image) formData.append("image", image);

    await sendMessages(formData);

    setText("");
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};


  return (
    <div className="w-full p-4  rounded-xl shadow-md">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3">
          <div className="relative w-24 h-24">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl border border-gray-300"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-red-600 shadow"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2"
      >
        <input
          type="text"
          className="flex-1 bg-transparent text-gray-500 outline-none text-sm sm:text-base placeholder-gray-500"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2 rounded-full hover:bg-emerald-100 transition ${
            imagePreview ? "text-emerald-600" : "text-gray-400"
          }`}
        >
          <Icon icon="mynaui:image" className="text-xl" />
        </button>

        {/* Send Button */}
       <button
  type="submit"
  disabled={isSendMessageLoading || (!text.trim() && !imagePreview)}
  className="p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition disabled:opacity-50"
>
  {isSendMessageLoading ? (
    <Icon icon="eos-icons:loading" className="text-xl animate-spin" />
  ) : (
    <Icon icon="majesticons:send-line" className="text-xl" />
  )}
</button>

      </form>
    </div>
  );
};

export default MessageInput;
