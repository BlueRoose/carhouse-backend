import RequestDto from "../dtos/requestDto.js";
import MailService from "./mailService.js";
import { Request } from "../models/models.js";

class RequestService {
  async createRequest(name, email, subject, text) {
    const request = await Request.create({ name, email, subject, text });

    const requestDto = new RequestDto(request);

    await MailService.sendConfirmingMail();

    return {
      request: requestDto,
    };
  }

  async getRequests() {
    const requests = Request.findAll();

    const requestsDto = requests.map((request) => new RequestDto(request));

    return {
      requests: requestsDto,
    };
  }
}

export default new RequestService();
