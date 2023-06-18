import { Request, Response, NextFunction } from "express";
import {
  validationResult,
  Result,
  ValidationError,
  param,
} from "express-validator";

function validationHandler(req: Request, res: Response, next: NextFunction) {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

export default validationHandler;
