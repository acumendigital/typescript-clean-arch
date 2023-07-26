//packages
import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { Logger } from "winston";

//controller
import AdminController from "@src/controllers/admin/adminController";

//validations
import { validateCreateAdmin } from "@src/validators/admin/adminValidators";

//middleware
import middlewares from "@src/api/middlewares";

//helpers
import handleResponse from "@src/helpers/response";

const route = Router();

export default (app: Router) => {
  app.use("/admin", route);

  route.post(
    "/create_admin",
    validateCreateAdmin,
    middlewares.isAuth,
    middlewares.isSuperAdmin,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug("Creating an admin with body: %o", req.body);
      try {
        console.log(req["currentUser"]);

        const adminController = Container.get(AdminController);
        const admin = await adminController.createAdmin(
          req.body,
          req["currentUser"]._id
        );

        return res.status(admin["code"]).json(admin);
      } catch (e) {
        logger.error("🔥 error: %o", e);
        next();
        return handleResponse(500, "could not create a new admin", null, res);
      }
    }
  );

  route.get(
    "/get_admins",
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    // middlewares.isSuperAdmin,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug("Requesting admin data with query: %o", req.query);
      try {
        const adminController = Container.get(AdminController);
        const admins = await adminController.getAdmins(req.query);

        return res.status(admins["code"]).json(admins);
      } catch (e) {
        logger.error("🔥 error: %o", e);
        next();
        return handleResponse(500, "could not get all admins", null, res);
      }
    }
  );
};
