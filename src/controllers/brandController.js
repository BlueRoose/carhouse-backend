import BrandService from "../services/brandService.js";

class BrandController {
  async createBrand(req, res, next) {
    try {
      const { name } = req.body;

      const result = await BrandService.createBrand(name);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateBrand(req, res, next) {
    try {
      const { brandId, name } = req.body;

      const result = await BrandService.updateBrand(brandId, name);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteBrand(req, res, next) {
    try {
      const { brandId } = req.body;

      const result = await BrandService.deleteBrand(brandId);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getBrands(req, res, next) {
    try {
      const result = await BrandService.getBrands();

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new BrandController();
