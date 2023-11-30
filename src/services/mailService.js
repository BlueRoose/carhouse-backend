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

  async sendActivationMail(to, activationMessage) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Подтверждение действия в CarHouse",
      text: "",
      html: `<h1 style="color: white; text-align: center">Здравствуйте!</h1>
      <h2 style="color: white; text-align: center">Ваш код для входа в аккаунт ${activationMessage}!</h2>`,
    });
  }

  async sendConfirmingMail(to) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Подтверждение действия в CarHouse",
      text: "",
      html: "<h1 style='color: white; text-align: center'>Здравствуйте, мы получили Ваш запрос и скоро свяжемся с Вами!</h1>",
    });
  }
}

export default new MailService();
