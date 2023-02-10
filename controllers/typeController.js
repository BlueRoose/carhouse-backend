const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  async createType(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }

  async getTypes(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
}

module.exports = new TypeController();
