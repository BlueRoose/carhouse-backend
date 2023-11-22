export default class ApiError extends Error {
  status;
  errors;

  constructor(status, errors = []) {
    super(errors[0]);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, ["Пользователь не авторизован"]);
  }

  static BadRequest(errors = []) {
    return new ApiError(400, errors);
  }
}