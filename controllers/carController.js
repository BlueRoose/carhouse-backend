const { Car } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class CarController {
  async createCar(req, res, next) {
    try {
      const {
        name,
        year,
        price,
        transmition,
        passenger,
        topSpeed,
        horsePower,
        time,
        brandId,
        typeId,
      } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const car = await Car.create({
        name,
        year,
        price,
        transmition,
        passenger,
        topSpeed,
        horsePower,
        time,
        brandId,
        typeId,
        img: fileName,
      });
      return res.json(car);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getCars(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let cars;
    if (!brandId && !typeId) {
      cars = await Car.findAndCountAll({limit, offset});
    }
    if (!brandId && typeId) {
      cars = await Car.findAndCountAll({ where: { typeId }, limit, offset });
    }
    if (brandId && !typeId) {
      cars = await Car.findAndCountAll({ where: { brandId }, limit, offset });
    }
    if (brandId && !typeId) {
      cars = await Car.findAndCountAll({ where: { brandId, typeId }, limit, offset });
    }
    return res.json(cars);
  }

  async getOneCar(req, res) {
    const { id } = req.body;
    const car = await Car.findOne({where: {id}});
    return res.json(car);
  }
}

module.exports = new CarController();
