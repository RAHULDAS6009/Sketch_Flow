import { WebSocketServer } from "ws";
import { greeting, User } from "@repo/common/greeting";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  const user: User = { name: "Rahul", password: "234" };
  console.log(greeting(user));

  ws.send("something");
});
