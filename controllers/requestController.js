const { Request } = require("../models/models");
const ApiError = require("../error/ApiError");
const nodemailer = require("nodemailer");

class RequestController {
  async createRequest(req, res, next) {
    try {
      const { name, email, subject, text } = req.body;

      const request = await Request.create({
        name,
        email,
        subject,
        text,
      });

      let transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
          user: "carhouseconsult@mail.ru",
          pass: "weTvN0KNQXGGpt1sUXgA",
        },
      });

      let result = await transporter.sendMail({
        from: "carhouseconsult@mail.ru", 
        to: email,
        subject: subject,
        text: `Hello, dear ${name}! We receive your message and will help you as soon as we can!`,
        html: `Hello, dear ${name}! We receive your message and will help you as soon as we can!`,
      });
      console.log(result);
      return res.json(request);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getRequests(req, res) {
    const requests = await Request.findAll();
    return res.json(requests);
  }
}

module.exports = new RequestController();
