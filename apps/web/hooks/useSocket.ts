import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket>();
  const [loading, setLoading] = useState<boolean>(true);
  const token=localStorage.getItem("token")

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=${token}`);
    ws.onopen = () => {
      setSocket(ws);
      setLoading(false);
    };
    return ()=>{
      socket?.close()
    }
  }, []);
  return {
    socket,
    loading,
  };
};
