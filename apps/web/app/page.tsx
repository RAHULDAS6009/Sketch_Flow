"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState<string>("");
  const router = useRouter();
  // todo: if token exsist redirect to / url 
   // TODO: try to do autosearch functionality to search specific room
  return (
    <div className="w-screen h-screen flex justify-center items-center  ">
      <input
        className="border p-2 outline-none rounded-md"
        type="text"
        value={roomId}
        
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      />
      <button
        onClick={() => {
          router.push(`/room/${roomId}`);
        }}
        className="bg-gray-400 p-2 rounded-md"
      >
        send
      </button>
    </div>
  );
}
