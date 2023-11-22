export default class TypeDto {
  name;
  id;

  constructor(model) {
    this.name = model.name;
    this.id = model.id;
  }
}
