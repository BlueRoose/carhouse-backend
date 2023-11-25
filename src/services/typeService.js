import TypeDto from "../dtos/typeDto.js";
import { Type } from "../models/models.js";
import ApiError from "../exceptions/apiError.js";

class TypeService {
  async createType(name) {
    const candidate = await Type.findOne({ where: { name } });
    if (candidate) {
      throw ApiError.BadRequest(["Такой тип уже существует"]);
    }

    const type = await Type.create({ name });

    const typeDto = new TypeDto(type);

    return {
      type: typeDto,
    };
  }

  async getTypes() {
    const types = await Type.findAll();

    const typesDto = types.map((type) => new TypeDto(type));

    return {
      types: typesDto,
    };
  }
}

export default new TypeService();
