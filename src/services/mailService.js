import nodemailer from "nodemailer";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, text, activationMessage, name) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Подтверждение действия в CarHouse",
      text: "",
      html: `
        <div style="width: fit-content; margin: 0 auto; text-align: center; background-color: #4F46E5; color: white; border-radius: 15px;">
          <img src="https://res.cloudinary.com/dyv5obin7/image/upload/v1699787341/sn2ikbqfy1mi03pzft8i.png" alt="logo" />
          ${
            name
              ? `<h1 style="color: white">Здравствуйте, ${name}!</h1>`
              : "<h1>Здравствуйте!</h1>"
          }
          <h3 style="max-width: 400px; margin: 0 auto; color: white;">${text}</h3>
          <div style="display: flex; margin-top: 25px;">
            <img style="max-width: 250px;" src="https://res.cloudinary.com/dyv5obin7/image/upload/v1699787341/wiif2lwlwuv3olddcmrt.png" alt="left" />
            <h1 style="color: white; font-size: 40px; font-weight: bold;">${activationMessage}</h1>
            <div style="width: 250px; height: 153px; margin-top: auto;">
              <img style="max-width: 125px; height: 153px;" src="https://res.cloudinary.com/dyv5obin7/image/upload/v1699789200/vbuawpesky9g55jnpbmu.png" alt="cat" />
            </div>
          </div>
        </div>
      `,
    });
  }

  async sendConfirmingMail(to, text, name) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Подтверждение действия в CarHouse",
      text: "",
      html: `
        <div style="width: fit-content; margin: 0 auto; text-align: center; background-color: #4F46E5; color: white; border-radius: 15px;">
          <img src="https://res.cloudinary.com/dyv5obin7/image/upload/v1699787341/sn2ikbqfy1mi03pzft8i.png" alt="logo" />
          ${
            name
              ? `<h1 style="color: white">Здравствуйте, ${name}!</h1>`
              : "<h1>Здравствуйте!</h1>"
          }
          <h3 style="max-width: 400px; margin: 0 auto; color: white;">${text}</h3>
          <div style="display: flex; margin-top: 25px;">
            <img style="max-width: 250px;" src="https://res.cloudinary.com/dyv5obin7/image/upload/v1699787341/wiif2lwlwuv3olddcmrt.png" alt="left" />
            <div style="width: 250px; height: 153px; margin-top: auto;">
              <img style="max-width: 125px; height: 153px;" src="https://res.cloudinary.com/dyv5obin7/image/upload/v1699789200/vbuawpesky9g55jnpbmu.png" alt="cat" />
            </div>
          </div>
        </div>
      `,
    });
  }
}

export default new MailService();
