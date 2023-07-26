//packages
import { Service, Inject } from "typedi";

//services
import MailerService from "@src/services/mailer";

//helpers
import { verifyHash } from "@src/helpers";
import handleResponse from "@src/helpers/response";
import { generateJwtToken } from "@src/helpers/jwtHelper";

@Service()
export default class AuthController {
  constructor(
    @Inject("adminModel") private adminModel: Models.AdminModel,
    @Inject("logger") private logger,
    private mailer: MailerService
  ) {}

  public async adminSignIn(email: string, password: string) {
    try {
      const user = await this.adminModel.findOne({ email }).select("+password");

      let userObject = user.toObject();
      //compare password
      const validPassword = await verifyHash(userObject["password"], password);

      if (!validPassword) {
        handleResponse(500, "Incorrect Email or Password");
      }

      Reflect.deleteProperty(userObject, "password"); //@todo make sure this works

      const token = await generateJwtToken(user);
      return handleResponse(200, "Admin signed in successfully", {
        token,
        user: userObject,
      });
    } catch (e) {
      this.logger.error("🔥 error: %o", e);
      return handleResponse(500, "admin could not sign in");
    }
  }
}
