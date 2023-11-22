import TypeService from "../services/typeService.js";

class TypeController {
  async createType(req, res, next) {
    try {
      const { name } = req.body;

      const result = await TypeService.createType(name);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getTypes(req, res, next) {
    try {
      const result = await TypeService.getTypes();

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new TypeController();
