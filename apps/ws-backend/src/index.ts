import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { jwt_secret } from "@repo/backend-common/types";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const decoded = jwt.verify(token, jwt_secret);

  if (typeof decoded == "string") {
    ws.close();
    return;
  }
  if (!decoded || !decoded.userId) {
    ws.close();
    return;
  }

  ws.on("message", (data) => {
    ws.send("pong");
  });
});
