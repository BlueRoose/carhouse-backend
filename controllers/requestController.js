const { Request } = require("../models/models");
const ApiError = require("../error/ApiError");

class RequestController {
  async createRequest(req, res, next) {
    try {
      const { name, email, text } = req.body;

      const car = await Request.create({
        name,
        email,
        text,
      });
      return res.json(request);
    } catch (error) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getRequests(req, res) {
    const requests = await Request.findAll();
    return res.json(requests);
  }
}
