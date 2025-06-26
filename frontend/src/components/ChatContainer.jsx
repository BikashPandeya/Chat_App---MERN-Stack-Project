import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";
import ChattersProfilePage from "../pages/ChattersProfilePage"; // Assuming you have a ProfilePage component
import { useNavigate  , Link} from "react-router-dom"; // Import useNavigate for navigation

const ChatContainer = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const { messages, getMessages, isMessageLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

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
          >
            {authUser && (
            <Link to={"/chattersprofile"} className = "chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="Profile Pic"
                  
                  className="cursor-pointer"
                />
              </div>
            </Link>)}
            {/* <div className="chat-image avatar"onClick={navigate("/chattersprofile")} >
            </div> */}
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col gap-2 bg-base-300 text-base-content">
                  {message.image && (
                    <div className="flex justify-center">

                      <img src={message.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2" />
                    </div>
                  ) }
                  {message.text && (
                    <p className="text-sm sm:text-base">
                      {message.text}
                    </p>
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
