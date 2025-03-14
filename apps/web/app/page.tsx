"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>();
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/signup");
    }
    const socket = new WebSocket(`ws://localhost:8080?token=${token}`);
    socket.onopen = function (event) {
      
    };
  }, []);
  function onClick() {
    if (input == undefined) return;
    setMessages([...messages, input]);
    setInput(" ");
  }
  return (
    <div className="w-screen h-screen bg-amber-200 flex items-center justify-center">
      <div className="bg-white w-[50%] h-[50%]">
        {messages.map((todo, index) => {
          return <div key={index}>{todo}</div>;
        })}
      </div>
      <div className="flex  items-center">
        Type :{" "}
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="border"
          type="text"
        />{" "}
        <button onClick={onClick} className="bg-slate-400 p-1 rounded-md">
          send
        </button>
      </div>
    </div>
  );
}
