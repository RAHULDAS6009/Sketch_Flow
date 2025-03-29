"use client";
import { useEffect, useState } from "react";
// import { useSocket } from "../hooks/useSocket";
import { WS_URL } from "../config";
import { Canvas } from "./Canvas";

export const RoomCanvas = ({ roomId }: { roomId: string }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4N2Y1NzUzMC1hOTBmLTQ2NmUtYjhjMy1jYzhjZjIwNDNhMDEiLCJpYXQiOjE3NDMyNDMzMDV9.Ywa_ZiGo9-DDivi6kTk6h-RuLiGfYPu_Y16YnBgsXyk";
    const ws = new WebSocket(`${WS_URL}?token=${token}`);
    ws.onopen = () => {
      setSocket(ws);
      // console.log("here i am");
      ws.send(JSON.stringify({
       type: "join_room",
       roomId,
     }));
    };
    // console.log("here i am 2");

    // const message = 

    // console.log(typeof message,message)


    // return ()=>{
    //   ws.close()
    // }
  }, []);
  if (!socket) return <div>connecting to server.....</div>;

  return <Canvas roomId={roomId} socket={socket} />;
};
