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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4YTQyN2Y1ZC05YTEwLTQzNWItYmM0My1mZDhkYWI2MDEwZjYiLCJpYXQiOjE3NDMyNTU2MjV9.hhXBu1aaAPkAeEyfEqTj6kYftFl31-mSq_7orb64JF8";
    const ws = new WebSocket(`${WS_URL}?token=${token}`);
    ws.onopen = () => {
      setSocket(ws);
      // console.log("here i am");
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );
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
