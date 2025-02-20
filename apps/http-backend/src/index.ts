import express, { Request, Response } from "express";
import { User, greeting } from "@repo/common/greeting";
const app = express();

app.get("/", (req: Request, res: Response) => {
  const user: User = { name: "Rahul", password: "123" };
  const greet: string = greeting(user);
  res.json({
    msg: "hello worlld",
    greet: greet,
  });
});

app.listen(5000, () => {
  console.log("server started on 5000");
});
