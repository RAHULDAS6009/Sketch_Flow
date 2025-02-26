import express, { Request, Response } from "express";
import { User, greeting } from "@repo/common";
import { jwt_secret } from "@repo/backend-common";
const app = express();

app.get("/", (req: Request, res: Response) => {
  const user: User = { name: "Rahul", password: "123" };
  const greet: string = greeting(user);
  const secret: string = jwt_secret;
  res.json({
    msg: "hello world",
    greet: greet,
    secret: secret,
  });
});

app.listen(5000, () => {
  console.log("server started on 5000");
});
