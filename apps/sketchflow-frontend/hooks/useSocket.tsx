// import { useEffect, useState } from "react";
// import { WS_URL } from "../config";

// export function useSocket() {
//   const [socket, setSocket] = useState<WebSocket>();
//   const [loading, setLoading] = useState<boolean>();

//   useEffect(() => {
//     setLoading(true);
//     const token = localStorage.getItem("token");

//     const ws = new WebSocket(`${WS_URL}?token=${token}`);
//     ws.onopen = () => {
//       setSocket(ws);
//     };
//   }, [socket,loading]);

//   return { loading, socket };
// }
