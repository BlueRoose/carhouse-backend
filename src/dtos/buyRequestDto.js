import UserDto from "./userDto.js";
import CarDto from "./carDto.js";

export default class BrandDto {
  phone;
  userId;
  carId;
  id;

  constructor(model) {
    this.phone = model.phone;
    this.userId = model.userId;
    this.carId = model.carId;
    this.id = model.id;
  }
}
