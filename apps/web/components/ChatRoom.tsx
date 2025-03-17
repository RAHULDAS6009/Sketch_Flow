import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getAllMessages({ id }: { id: string }) {
  const response = await axios.get(`${BACKEND_URL}/chats/${id}`);
  
  return response.data.chats;
}

export async function ChatRoom({ id }: { id: string }) {
  const messages = await getAllMessages({ id });
  return (
    <div>
      <ChatRoomClient id={id} messages={messages} />
    </div>
  );
}
