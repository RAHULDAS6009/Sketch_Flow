import express, { Request, Response } from "express";
import {
  CreateRoomSchema,
  createUserSchema,
  SigninSchema,
} from "@repo/common/types";
import jwt from "jsonwebtoken";
import { jwt_secret } from "@repo/backend-common/types";
import { middleware } from "./middleware";
const app = express();
app.use(express.json());

app.post("/signup", (req: Request, res: Response) => {
  const data = createUserSchema.safeParse(req.body);

  const secret = jwt_secret;

  if (!data.success) {
    res.json({
      msg: "Incorrect inputs",
      error: data.error,
    });
    return;
  }

  res.json({
    userId: "123",
    secret,
  });
});

app.post("/signin", (req: Request, res: Response) => {
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  const userId = 1;
  const token = jwt.sign({ userId }, jwt_secret);

  res.json({
    token,
  });
});
app.post("/room", middleware, (req: Request, res: Response) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  res.json({
    roomId: 123,
  });
});

app.listen(5000, () => {
  console.log("server started on 5000");
});
