"use client";
import { useEffect, useState } from "react";
import { WS_URL } from "../config";
import { Canvas } from "./Canvas";

export const RoomCanvas = ({ roomId }: { roomId: string }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZTA2NTVmMy0wNGVjLTQ3NGYtOTdhZS1jZWJhNDQ3Mjg4MDEiLCJpYXQiOjE3NDQ3MDc1Nzl9.Ic-VOXCFbSjtec7reeT6DjMgxwYKLx0ZPy8zfyL87FI";
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
   
  }, []);
  if (!socket) return <div>connecting to server.....</div>;

  return <Canvas roomId={roomId} socket={socket} />;
};
