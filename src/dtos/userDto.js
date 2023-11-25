export default class UserDto {
  name;
  surname;
  email;
  role;
  id;

  constructor(model) {
    this.name = model.name;
    this.surname = model.surname;
    this.email = model.email;
    this.role = model.role;
    this.id = model.id;
  }
}
