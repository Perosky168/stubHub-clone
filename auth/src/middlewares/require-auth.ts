import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/notAuthorized-error";

export const RequireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};