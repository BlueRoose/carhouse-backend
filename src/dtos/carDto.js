export default class CarDto {
  name;
  year;
  price;
  color;
  transmission;
  passenger;
  topSpeed;
  horsePower;
  rating;
  time;
  brandId;
  typeId;
  imgs;
  status;
  buyRequestId;
  favouritedCarId;
  id;

  constructor(model) {
    this.name = model.name;
    this.year = model.year;
    this.price = model.price;
    this.color = model.color;
    this.transmission = model.transmission;
    this.passenger = model.passenger;
    this.topSpeed = model.topSpeed;
    this.horsePower = model.horsePower;
    this.rating = model.rating;
    this.time = model.time;
    this.brandId = model.brandId;
    this.typeId = model.typeId;
    this.imgs = model.imgs;
    this.status = model.status;
    this.buyRequestId = model.buyRequestId;
    this.favouritedCarId = model.favouritedCarId;
    this.id = model.id;
  }
}
