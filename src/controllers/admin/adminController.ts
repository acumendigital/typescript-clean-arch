//packages
import { Service, Inject } from "typedi";

//services
import MailerService from "@src/services/mailer";

//helpers
import { hash } from "@src/helpers";
import handleResponse from "@src/helpers/response";

@Service()
export default class AdminController {
  constructor(
    @Inject("adminModel") private adminModel: Models.AdminModel,
    @Inject("logger") private logger,
    private mailer: MailerService
  ) {}

  //create a new admin
  public async createAdmin(data: object, created_by: string) {
    try {
      if (data["role"] == "super admin") {
        handleResponse(401, "Unauthorized, You cannot created a super admin");
      }

      let gen_password = Math.floor(100000 + Math.random() * 900000);

      const password = await hash(gen_password.toString());

      const admin = await this.adminModel.create({
        ...data,
        created_by,
        password: password,
      });

      const adminObject = admin.toObject();

      Reflect.deleteProperty(adminObject, "password"); //@todo make sure this works

      //send mail here to notify the admin created of account and password

      return handleResponse(201, "Admin created successfully", {
        admin: adminObject,
      });
    } catch (e) {
      this.logger.error("🔥 error: %o", e);
      return handleResponse(500, "could not create an admin");
    }
  }

  //get admin by a unique attribute
  public async getAdminByParam(param: string, attribute: string) {
    try {
      const admin = await this.checkExists(param, attribute);

      if (!admin) {
        return handleResponse(401, "This user does not exist on this platform");
      }

      return handleResponse(200, "Admin retrieved successfully", { admin });
    } catch (e) {
      this.logger.error("🔥 error: %o", e);
      return handleResponse(500, `could not get admin by ${attribute}`);
    }
  }

  //get all admins
  public async getAdmins(query) {
    try {
      const admins = await this.adminModel.find();

      return handleResponse(200, "Admin retrieved successfully", { admins });
    } catch (e) {
      this.logger.error("🔥 error: %o", e);
      return handleResponse(500, `could not get all admins`);
    }
  }

  // check if a unique field exists
  public async checkExists(param: string, attribute: string) {
    const query =
      attribute == "username"
        ? { username: param }
        : attribute == "phone"
        ? { phone: param }
        : attribute == "email"
        ? { email: param }
        : { _id: param };

    return await this.adminModel.findOne(query).select("+password +pin");
  }
}
