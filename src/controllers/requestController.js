import RequestService from "../services/requestService.js";

class RequestController {
  async createRequest(req, res, next) {
    try {
      const { name, email, subject, text } = req.body;

      const result = await RequestService.createRequest(
        name,
        email,
        subject,
        text
      );

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getRequests(req, res) {
    try {
      const result = await RequestService.getRequests();

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new RequestController();
