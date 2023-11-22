export default class BrandDto {
  name;
  id;

  constructor(model) {
    this.name = model.name;
    this.id = model.id;
  }
}
