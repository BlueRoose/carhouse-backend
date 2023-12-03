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

  async updateType(req, res, next) {
    try {
      const { typeId, name } = req.body;

      const result = await TypeService.updateType(typeId, name);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteType(req, res, next) {
    try {
      const { typeId } = req.body;

      const result = await TypeService.deleteType(typeId);

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
