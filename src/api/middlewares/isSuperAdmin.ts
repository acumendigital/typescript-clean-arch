import { Container } from "typedi";
import mongoose from "mongoose";
import { Logger } from "winston";

/**
 * Attach admin to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */

const isSuperAdmin = async (req: any, res: any, next: any) => {
  const Logger: Logger = Container.get("logger");
  try {
    const AdminModel = Container.get("adminModel") as mongoose.Model<
      mongoose.Document
    >;
    const admin = await AdminModel.findById(req.currentUser._id);
    if (!admin) {
      return res.status(403).send({
        error: true,
        message: "this user does not exist",
      });
    }

    if (admin["role"] != "super admin")
      return res.status(403).send({
        error: true,
        message: "Access denied, only super admins can perform this operation.",
      });

    next();
  } catch (e) {
    Logger.error("🔥 Error attaching user to req: %o", e);
    res.status(400).json({
      error: true,
      message: "Invalid token.",
    });
  }
};

export default isSuperAdmin;
