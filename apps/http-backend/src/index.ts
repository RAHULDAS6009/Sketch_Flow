import express, { Request, Response } from "express";
import { createUserSchema } from "@repo/common/types";
import { jwt_secret } from "@repo/backend-common/types";
const app = express();
app.use(express.json());

app.post("/", (req: Request, res: Response) => {
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

app.listen(5000, () => {
  console.log("server started on 5000");
});
