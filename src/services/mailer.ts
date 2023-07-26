//packages
import { Service } from "typedi";
import sgMail from "@sendgrid/mail";

//config
import config from "@src/config";

@Service()
export default class MailerService {
  constructor() {}

  public async sendgridMail(
    emails: [string],
    template_id: string,
    dynamic_template_data: object
  ) {
    sgMail.setApiKey(config.sendgrid_key);

    const msg = {
      to: emails,
      from: "info@example.com",
      templateId: template_id,
      dynamic_template_data: dynamic_template_data,
    };
    // @ts-ignore
    sgMail.send(msg, (err: any) => {
      if (err) {
        console.log({
          error: true,
          message: "email didn't send, please try again",
          data: err,
        });
      }
    });
  }

  //postmark mail here
}
