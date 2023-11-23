import UserDto from "./userDto.js";
// import CarDto from "./carDto.js";

export default class BrandDto {
  phone;
  user;
  car;
  id;

  constructor(model) {
    this.phone = model.phone;
    this.user = new UserDto(model.user);
    // this.car = new CarDto(model.car);
    this.id = model.id;
  }
}
