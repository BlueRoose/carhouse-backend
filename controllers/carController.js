const { Car, Brand, Type } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

function sortByName(cars, brands) {
  let newBrands = brands.sort((a, b) => (a.name > b.name ? 1 : -1));
  const order = [];
  newBrands.map((brand) => order.push(brand.id));
  return cars.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}

const sortByPopularity = (cars) => {
  return cars.sort((a, b) => (a.rating < b.rating ? 1 : -1));
};

const sortByPriceLow = (cars) => {
  return cars.sort((a, b) => (a.price > b.price ? 1 : -1));
};

const sortByPriceHigh = (cars) => {
  return cars.sort((a, b) => (a.price < b.price ? 1 : -1));
};

class CarController {
  async createCar(req, res, next) {
    try {
      const {
        name,
        year,
        price,
        color,
        transmition,
        passenger,
        topSpeed,
        horsePower,
        rating,
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
        color,
        transmition,
        passenger,
        topSpeed,
        horsePower,
        rating,
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
    let { limit, page, sorttype, brand, type, model, year } = req.query;
    page = page || 1;
    limit = limit || 9;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    let cars;
    const where = {};

    if (brand !== "") {
      const brands = await Brand.findAll();
      where.brandId = brands.find((br) => br.name === brand).id;
      if (type !== "") {
        const types = await Type.findAll();
        where.typeId = types.find((tp) => tp.name === type).id;
        if (model !== "") {
          where.name = model;
          if (year !== "") {
            where.year = Number(year);
          }
        }
      }
      cars = await Car.findAndCountAll({ where: where });
    } else {
      cars = await Car.findAndCountAll();
    }
    cars.fullCars = cars.rows;
    switch (sorttype) {
      case "Name":
        cars.rows = sortByName(cars.rows, brands).slice(startIndex, endIndex);
        break;
      case "Popularity":
        cars.rows = sortByPopularity(cars.rows).slice(startIndex, endIndex);
        break;
      case "Low Price":
        cars.rows = sortByPriceLow(cars.rows).slice(startIndex, endIndex);
        break;
      case "High Price":
        cars.rows = sortByPriceHigh(cars.rows).slice(startIndex, endIndex);
        break;
      default:
        cars.rows = cars.rows.slice(startIndex, endIndex);
        break;
    }
    return res.json(cars);
  }

  async getOneCar(req, res) {
    const { id } = req.body;
    const car = await Car.findOne({ where: { id } });
    return res.json(car);
  }
}

module.exports = new CarController();
