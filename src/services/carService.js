import { v4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import CarDto from "../dtos/carDto.js";
import { User, Car, Favourites, FavouritedCar } from "../models/models.js";
import cloudinary from "../utils/upload.js";
import ApiError from "../exceptions/apiError.js";

class CarService {
  async createCar(data) {
    const files = [];
    for (let file of data.files) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      let fileName = `${v4()}.jpg`;
      await file.mv(path.resolve(__dirname, "../..", "static", fileName));
      const cloudinaryResult = await cloudinary.uploader.upload(
        `static/${fileName}`
      );
      files.push(cloudinaryResult.secure_url);
    }
    const car = await Car.create({ ...data, imgs: files });

    const carDto = new CarDto(car);

    return {
      car: carDto,
    };
  }

  async deleteCar(carId) {
    const candidate = await Car.findByPk(carId);
    if (!candidate) {
      throw ApiError.BadRequest(["Такого автомобиля не существует"]);
    }

    await Car.destroy({ where: { id: carId } });

    return {
      success: true
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
    const user = await User.findByPk(userId);
    if (!user) {
      throw ApiError.BadRequest(["Такого пользователя не существует"]);
    }

    const car = await Car.findByPk(carId);
    if (!car) {
      throw ApiError.BadRequest(["Такого автомобиля не существует"]);
    }

    const favouritedCar = await FavouritedCar.create();

    const favouritesInstance = await Favourites.findOne({ where: { userId: user.id } });

    if (!favouritesInstance) {
      const newFavouritesInstance = await Favourites.create({ userId: user.id });
      
      await FavouritedCar.update({ favouriteId: newFavouritesInstance.id }, { where: { id: favouritedCar.id } });
    } else {
      await FavouritedCar.update({ favouriteId: favouritesInstance.id }, { where: { id: favouritedCar.id } });
    }

    await Car.update({ favouritedCarId: favouritedCar.id }, { where: { id: carId } });

    return {
      success: true,
    };
  }

  async removeFromFavourites(userId, carId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw ApiError.BadRequest(["Такого пользователя не существует"]);
    }
  
    const car = await Car.findByPk(carId);
    if (!car) {
      throw ApiError.BadRequest(["Такого автомобиля не существует"]);
    }

    const favouritedCarId = car.favouritedCarId;

    await FavouritedCar.destroy({ where: { id: favouritedCarId } });

    await Car.update({ favouritedCarId: null }, { where: { id: carId } });
  
    return {
      success: true,
    };
  }

  async getUsersFavourites(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw ApiError.BadRequest(["Такого пользователя не существует"]);
    }

    const favouritedCars = [];

    const favourites = await Favourites.findOne({ where: { userId } });
    
    const usersFavouritedCars = await FavouritedCar.findAll({ where: { favouriteId: favourites.id } });
    
    for (const favourite of usersFavouritedCars) {
      const car = await Car.findOne({ where: { favouritedCarId: favourite.id } });
      const carDto = new CarDto(car);
      favouritedCars.push(carDto);
    }

    return {
      favouritedCars
    };
  }
}

export default new CarService();
