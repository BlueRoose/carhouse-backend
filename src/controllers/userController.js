const { User } = require("../models/models");
const ApiError = require("../exceptions/apiError");

class UserController {
  async checkUser(req, res, next) {
    const { password } = req.query;
    const user = await User.findOne({ where: { password } });
    if (!user) {
      return next(ApiError.internalRequest("User not found"));
    }
    return res.json(user);
  }

  async createUser(req, res) {
    const { password, role } = req.body;
    const user = await User.create({ password, role });

    return res.json(user);
  }
}

module.exports = new UserController();
