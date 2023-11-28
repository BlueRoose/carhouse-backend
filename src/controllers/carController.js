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
      const files = Object.values(req.files)[0];

      const result = await CarService.createCar({
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
        files,
      });

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

  async addToFavourites(req, res, next) {
    try {
      const { userId, carId } = req.body;

      const result = await CarService.addToFavourites(userId, carId);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getUsersFavourites(req, res, next) {
    try {
      const { userId } = req.query;

      const result = await CarService.getUsersFavourites(userId);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new CarController();
