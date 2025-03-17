"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export const ChatRoomClient = ({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) => {
  const [input, setInput] = useState<string>("");
  const [chats, setChats] = useState(messages);
  const { socket, loading } = useSocket();
  useEffect(() => {
    socket?.send(
      JSON.stringify({
        type: "join_room",
        roomId: id,
      })
    );
    if (socket && !loading) {
      socket.onmessage = (event) => {
        const parsedMessage = JSON.parse(event.data);
        if (parsedMessage.type === "chat") {
          setChats((prev) => [...prev, { message: parsedMessage.message }]);
        }
      };
    }
  }, [socket, loading, id]);

  return (
    <div>
      {chats.map((chat, index) => {
        return <div key={index}>{chat.message}</div>;
      })}
      <input
        value={input}
        type="text"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "chat",
              message: input,
              roomId: id,
            })
          );
          setInput("");
        }}
      >
        Send
      </button>
    </div>
  );
};
