import BrandDto from "../dtos/brandDto.js";
import { Brand } from "../models/models.js";
import ApiError from "../exceptions/apiError.js";

class BrandService {
  async createBrand(name) {
    const candidate = await Brand.findOne({ where: { name } });
    if (candidate) {
      throw ApiError.BadRequest(["Такой бренд уже существует"]);
    }

    const brand = await Brand.create({ name });

    const brandDto = new BrandDto(brand);

    return {
      brand: brandDto,
    };
  }

  async getBrands() {
    const brands = await Brand.findAll();

    const brandsDto = brands.map((brand) => new BrandDto(brand));

    return {
      brands: brandsDto,
    };
  }
}

export default new BrandService();
