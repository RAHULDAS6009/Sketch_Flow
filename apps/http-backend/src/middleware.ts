import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "@repo/backend-common/types";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  // TODO:cookie authentication
  // TODO:solve it with Bearer

  const token = req.headers["authorization"] ?? "";

  const deocoded = jwt.verify(token, jwt_secret) as jwt.JwtPayload;

  if (deocoded) {
    req.userId = deocoded.userId ;
    next();
  } else {
    res.status(403).json({
      message: "Unauthorized",
    });
  }
};
