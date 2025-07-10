import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate for navigation
import { Pointer, X } from "lucide-react"; // Import the X icon for closing the image view

const ChatContainer = () => {
  const [showImage, setShowImage] = useState(false);
  const [showImageId, setShowImageId] = useState(null);
  const handleClick = () => {
    setShowImage(!showImage);
  };
  const handleImageClick = (id) => {
    setShowImageId(showImageId === id ? null : id);
  };
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const {
    messages,
    getMessages,
    isMessageLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  useEffect(() => {
    subscribeToMessages();
    getMessages(selectedUser._id);

    return () => unsubscribeFromMessages(); // Unsubscribe from messages when component unmounts
  }, [selectedUser._id, getMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 flex flex-col overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId == authUser._id ? "chat-end" : "chat-start"
            } `}
            ref={messageEndRef}
          >
            {authUser && (
              <div className="size-10 rounded-full border chat-image avatar">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="Profile Pic"
                  className="size-12 object-cover rounded-full"
                />
              </div>
            )}
            {/* <div className="chat-image avatar"onClick={navigate("/chattersprofile")} >
            </div> */}
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col gap-2 bg-base-300 text-base-content">
              {message.image && (
                <div className="flex flex-col items-center">
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer"
                    onClick={() => handleImageClick(message._id)}
                  />
                  {showImageId === message._id && (
                    <div
                      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                      onClick={() => setShowImageId(null)}
                    >
                      <div className="relative">
                        <button
                          type="button"
                          className="absolute -top-4 -right-4 bg-base-300 rounded-full p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowImageId(null);
                          }}
                        >
                          <X className="size-6 text-white" />
                        </button>
                        <img
                          src={message.image}
                          alt="Full size"
                          className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {message.text && (
                <p className="text-sm sm:text-base">{message.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
