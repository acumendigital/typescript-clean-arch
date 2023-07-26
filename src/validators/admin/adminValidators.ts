import { validator, sendError } from "@src/validators";

export function validateCreateAdmin(req, res, next) {
  const validationRule = {
    phone: "required|string|admin_unique_param_available:phone",
    email: "required|string|email|admin_unique_param_available:email",
    first_name: "required|string",
    last_name: "required|string",
    role: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      sendError(res, err);
    } else {
      next();
    }
  });
}

export function validateUpdatePassword(req, res, next) {
  const validationRule = {
    newPassword: "required|string",
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
