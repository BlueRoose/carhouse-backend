import BuyRequestDto from "../dtos/buyRequestDto.js";
import MailService from "./mailService.js";
import { User, BuyRequest, Car } from "../models/models.js";
import ApiError from "../exceptions/apiError.js";

class BuyRequestService {
  async createBuyRequest(userId, phone, carId) {
    const buyRequest = await BuyRequest.create({ userId, phone, carId });

    await Car.update({ status: "ЗАКАЗАНО", buyRequestId: buyRequest.id }, { where: { id: carId } });

    const user = await User.findByPk(userId);

    await MailService.sendConfirmingMail(user.email);

    return {
      success: true,
    };
  }

  async deleteBuyRequest(id) {
    const candidate = await BuyRequest.findByPk(id);
    if (!candidate) {
      throw ApiError.BadRequest(["Такого запроса не существует"]);
    }

    await BuyRequest.destroy({ where: { id } });

    return {
      success: true
    };
  }

  async getBuyRequests() {
    const buyRequests = await BuyRequest.findAll();

    const buyRequestsDto = buyRequests.map(
      (buyRequest) => new BuyRequestDto(buyRequest)
    );

    return {
      buyRequests: buyRequestsDto,
    };
  }
}

export default new BuyRequestService();
