import { v4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import CarDto from "../dtos/carDto.js";
import { User, Car } from "../models/models.js";
import cloudinary from "../utils/upload.js";
import ApiError from "../exceptions/apiError.js";

class CarService {
  async createCar(data) {
    const files = [];
    for (let file of data.files) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      let fileName = `${v4()}.jpg`;
      await file.mv(path.resolve(__dirname, "..", "static", fileName));
      const cloudinaryResult = await cloudinary.uploader.upload(
        `src/static/${fileName}`
      );
      files.push(cloudinaryResult.secure_url);
    }
    const car = await Car.create({ ...data, imgs: files });

    const carDto = new CarDto(car);

    return {
      car: carDto,
    };
  }

  async getCars() {
    const cars = await Car.findAll();

    const carsDto = cars.map((car) => new CarDto(car));

    return {
      cars: carsDto,
    };
  }

  async getCar(carId) {
    const car = await Car.findOne({ where: { id: carId } });

    const carDto = new CarDto(car);

    return {
      car: carDto,
    };
  }

  async addToFavourites(userId, carId) {
    const user = User.findByPk(userId);
    if (!user) {
      throw ApiError.BadRequest(["Такого пользователя не существует"]);
    }

    const car = Car.findByPk(carId);
    if (!car) {
      throw ApiError.BadRequest(["Такого автомобиля не существует"]);
    }

    let favourites = await user.getFavourites();
    if (!favourites) {
      favourites = await user.createFavourites();
    }

    const favouritedCar = await favourites.createFavouritedCar();
    await favouritedCar.setCar(car);

    return {
      success: true,
    };
  }

  async getUsersFavourites(userId) {
    const user = User.findByPk(userId);
    if (!user) {
      throw ApiError.BadRequest(["Такого пользователя не существует"]);
    }

    let favourites = await user.getFavourites();

    const favouritesDto = favourites.map((favourite) => new CarDto(favourite));

    return {
      favourites: favouritesDto,
    };
  }
}

export default new CarService();
