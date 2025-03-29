import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { jwt_secret } from "@repo/backend-common/types";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

// if user is sunscribed to multiple room
interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}
// Stateful Backend

//TODO:Better approach and easy to read approcah is singleton
//TODO:Optimal approcah is Redux
// TODO:easy to read not so good used global variable

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, jwt_secret);

    if (typeof decoded == "string") {
      return null;
    }
    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (error) {
    return null;
  }
}

wss.on("connection", function connection(ws: WebSocket, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);
  if (userId == null) {
    ws.close();
    return;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async (data) => {
    try {
      const parsedData = JSON.parse(data as unknown as string);
      console.log(parsedData);
      if (parsedData.type === "join_room") {
        const user = users.find((x) => x.ws === ws);
        // TODO:Does this room exsist
        // TODO:is this user have access to join this room
        // TODO:feature limit like 10 users in the room

        user?.rooms.push(parsedData.roomId);
      }

      if (parsedData.type === "leave_room") {
        const user = users.find((x) => x.ws === ws);
        if (!user) return;
        user.rooms = user.rooms.filter((x) => x !== parsedData.roomId);
      }

      if (parsedData.type === "chat") {
        const user = users.find((x) => x.ws === ws);

        const roomId = parsedData.roomId;
        if (!user?.rooms.includes(roomId)) {
          return;
        }
        //TODO:message checker
        // TODO:auth of sending messages to room (Only certain people join certain room)
        const message = parsedData.message;
        console.log(message,typeof roomId,roomId,userId);

        //entry in the database
        await prismaClient.chat.create({
          data: { roomId:Number(roomId), message, userId }
        });

        //send to web socket server
        users.forEach((user) => {
          if (user.rooms.includes(roomId)) {
            user.ws.send(
              JSON.stringify({
                type: "chat",
                message: message,
                roomId,
              })
            );
          }
        });

      }
    } catch (error) {
      console.log(error);
    }
  });
});
