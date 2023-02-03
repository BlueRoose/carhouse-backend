const { User } = require("../models/models");
const ApiError = require("../error/ApiError");

class UserController {
  async checkUser(req, res, next) {
    const { password } = req.body;
    const user = await User.findOne({where: {password}});
    if (!user) {
      return next(ApiError.internalRequest("User not found"));
    }
    return res.json(user);
  }
}

module.exports = new UserController();
