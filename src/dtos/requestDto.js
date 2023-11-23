export default class RequestDto {
  name;
  email;
  subject;
  text;
  id;

  constructor(model) {
    this.name = model.name;
    this.email = model.email;
    this.subject = model.subject;
    this.text = model.text;
    this.id = model.id;
  }
}
