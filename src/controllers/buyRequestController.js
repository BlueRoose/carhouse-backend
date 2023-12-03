import BuyRequestService from "../services/buyRequestService.js";

class BuyRequestController {
  async createBuyRequest(req, res, next) {
    try {
      const { userId, phone, carId } = req.body;

      const result = await BuyRequestService.createBuyRequest(
        userId,
        phone,
        carId
      );

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteBuyRequest(req, res, next) {
    try {
      const { id } = req.body;

      const result = await BuyRequestService.deleteBuyRequest(id);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getBuyRequests(req, res, next) {
    try {
      const result = await BuyRequestService.getBuyRequests();

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new BuyRequestController();
