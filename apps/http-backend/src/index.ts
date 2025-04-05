import express, { Request, Response } from "express";
import {
  CreateRoomSchema,
  createUserSchema,
  SigninSchema,
} from "@repo/common/types";
import jwt from "jsonwebtoken";
import { jwt_secret } from "@repo/backend-common/types";
import middleware from "./middleware";
import { prismaClient } from "@repo/db/client";
import cors from "cors";
const app = express();
const corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));
app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
  // TODO:try to give wrong inputs format and recreate the try catch thing
  const data = createUserSchema.safeParse(req.body);

  if (!data.success) {
    res.json({
      msg: "Incorrect inputs",
      error: data.error,
    });
    return;
  }

  try {
    const newUser = await prismaClient.user.create({
      //TODO: hash the password
      data: {
        email: req.body.username,
        password: req.body.password,
        name: req.body.name,
      },
    });

    res.json({
      userId: newUser.id,
      message: "User created Successfully",
    });
  } catch (error) {
    res.status(411).json({
      message: "Something went wrong/user already",
    });
  }
});

app.post("/signin", async (req: Request, res: Response) => {
  // TODO:try to give wrong inputs format and recreate the try catch thing

  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }
  try {
    // TODO: Compare the hash Password
    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.username,
        password: parsedData.data.password,
      },
    });

    if (!user) {
      res.status(403).json({
        message: "Not Authorized",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      jwt_secret
    );

    res.json({
      token,
    });
  } catch (error) {
    console.log("what is the erro", error);
    res.json({
      message: "Something went wrong",
    });
  }
});

app.post("/room", middleware, async (req: Request, res: Response) => {
  // TODO:try to give wrong inputs format and recreate the try catch thing

  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: req.userId,
      },
    });

    res.json({
      room: room.id,
      message: "Room created successfully",
    });
  } catch (error) {
    res.json({
      message: "Room already exsist",
    });
  }
});

app.get("/chats/:roomId", async (req: Request, res: Response) => {
  const roomId = Number(req.params.roomId);
  const chats = await prismaClient.chat.findMany({
    where: {
      roomId: roomId,
    },
    select: {
      id: true,
      message: true,
    },
    orderBy: {
      id: "asc",
    },
    take: 50,
  });

  res.json({
    chats,
  });
});

app.get("/room/:slug", async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      slug,
    },
  });

  res.json({
    room,
  });
});

app.listen(5000, () => {
  console.log("server started on 5000");
});
