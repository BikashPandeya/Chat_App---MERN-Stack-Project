import { useState } from 'react'


const MessageInput = () => {
    const [text, setText] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
  return (
    <div>MessageInput</div>
  )
}

export default MessageInput