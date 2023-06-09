import { validationResult } from "express-validator";

function validationHandler(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().map((element) => {
      delete element.value;
      delete element.location;
    });
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

export default validationHandler;
