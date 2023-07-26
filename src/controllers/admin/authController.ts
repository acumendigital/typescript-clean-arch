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
		@Inject("adminRepo") private adminRepo: Models.Admin,
		@Inject("logger") private logger,
		private mailer: MailerService,
	) {}

	public async adminSignIn(email: string, password: string) {
		try {
			const user = await this.adminRepo.findOne({ email }, "+password");

			if (!user) {
				return handleResponse(401, "Incorrect Email or Password");
			}

			//compare password
			const validPassword = await verifyHash(user["password"], password);

			if (!validPassword) {
				return handleResponse(401, "Incorrect Email or Password");
			}

			Reflect.deleteProperty(user, "password"); //@todo make sure this works

			const token = await generateJwtToken(user);
			return handleResponse(200, "Admin signed in successfully", {
				token,
				user,
			});
		} catch (e) {
			this.logger.error("🔥 error: %o", e);
			return handleResponse(500, "admin could not sign in");
		}
	}
}
