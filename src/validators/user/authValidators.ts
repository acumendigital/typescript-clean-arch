import { validator, sendError } from "../index.js";

export function validateLogin(req, res, next) {
  const validationRule = {
    email: "required|string|email",
    password: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      sendError(res, err);
    } else {
      next();
    }
  });
}

export function validateForgotPassword(req, res, next) {
  const validationRule = {
    email: "required|string|email",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      sendError(res, err);
    } else {
      next();
    }
  });
}

export function validateResetPassword(req, res, next) {
  const validationRule = {
    email: "required|string|email",
    password: "required|string",
    token: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      sendError(res, err);
    } else {
      next();
    }
  });
}
