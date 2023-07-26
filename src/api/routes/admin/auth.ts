//packages
import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { Logger } from "winston";

//controller
import AdminController from "@src/controllers/admin/adminController";
import AuthController from "@src/controllers/admin/authController";

//validations
import { validateLogin } from "@src/validators/admin/authValidators";

//helpers
import handleResponse from "@src/helpers/response";

const route = Router();

export default (app: Router) => {
  app.use("/admin/auth", route);

  route.post(
    "/sign_in",
    validateLogin,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug("Admin signing in with body: %o", req.body);
      try {
        const { email, password } = req.body;

        const authController = Container.get(AuthController);
        const signIn = await authController.adminSignIn(email, password);

        return res.status(signIn["code"]).json(signIn);
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );
};
