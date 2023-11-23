import CarService from "../services/carService.js";

class CarController {
  async createCar(req, res, next) {
    try {
      const {
        name,
        year,
        price,
        color,
        transmission,
        passenger,
        topSpeed,
        horsePower,
        rating,
        time,
        brandId,
        typeId,
      } = req.body;
      const { img } = req.files;

      const result = await CarService.createCar(
        name,
        year,
        price,
        color,
        transmission,
        passenger,
        topSpeed,
        horsePower,
        rating,
        time,
        brandId,
        typeId,
        img
      );

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getCars(req, res, next) {
    try {
      const result = await CarService.getCars();

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getCar(req, res, next) {
    try {
      const { id } = req.query;

      const result = await CarService.getCar(id);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new CarController();
