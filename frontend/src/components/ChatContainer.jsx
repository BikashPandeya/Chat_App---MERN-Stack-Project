import { useChatStore } from "../store/useChatStore"
import { useEffect } from "react"

const ChatContainer = () => {
  const {messages , getMessages , isMessageLoading ,selectedUser}  = useChatStore()
  useEffect(() => {
    getMessages(selectedUser._id)
  }, [selectedUser._id , getMessages])

  if(isMessageLoading) return <div>Loading.....</div>

  
  return (
    <div>
      
    </div>
  )
}

export default ChatContainer
