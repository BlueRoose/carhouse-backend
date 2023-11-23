export default class BrandDto {
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
  img;
  id;

  constructor(model) {
    this.name = model.name;
    this.year = model.yaer;
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
    this.img = model.img;
    this.id = model.id;
  }
}
