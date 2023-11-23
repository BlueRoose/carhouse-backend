import BuyRequestDto from "../dtos/buyRequestDto.js";
import MailService from "./mailService.js";
import { BuyRequest } from "../models/models.js";

class BuyRequestService {
  async createBuyRequest(userId, phone, carId) {
    const buyRequest = await BuyRequest.create({ userId, phone, carId });

    const buyRequestDto = new BuyRequestDto(buyRequest);

    await MailService.sendConfirmingMail();

    return {
      buyRequest: buyRequestDto,
    };
  }

  async getBuyRequests() {
    const buyRequests = BuyRequest.findAll();

    const buyRequestsDto = buyRequests.map(
      (buyRequest) => new BuyRequestDto(buyRequest)
    );

    return {
      buyRequests: buyRequestsDto,
    };
  }
}

export default new BuyRequestService();
