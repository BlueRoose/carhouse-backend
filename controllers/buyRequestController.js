const { BuyRequest } = require("../models/models");
const ApiError = require("../error/ApiError");
const nodemailer = require("nodemailer");

class BuyRequestController {
  async createRequest(req, res, next) {
    try {
      const { name, email, phone, carId } = req.body;

      const request = await BuyRequest.create({
        name,
        email,
        phone,
        carId,
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
        subject: "Your order at CarHouse",
        text: `Hello, dear ${name}! We receive your order and will contact you as soon as we can!`,
        html: `Hello, dear ${name}! We receive your order and will contact you as soon as we can!`,
      });
      console.log(result);
      return res.json(request);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getRequests(req, res) {
    const requests = await BuyRequest.findAll();
    return res.json(requests);
  }
}

module.exports = new BuyRequestController();
