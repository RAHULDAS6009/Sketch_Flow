import express, { Request, Response } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
    msg: "hello worlld",
  });
});

app.listen(5000, ()=>{
  console.log("server started on 5000")
});
