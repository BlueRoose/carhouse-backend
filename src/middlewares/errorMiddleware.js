import ApiError from "../exceptions/apiError.js";

export default function (err, req, res, next) {
  console.log(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({ errors: err.errors });
  }

  return res.status(500).json({ errors: ["Непредвиденная ошибка"] });
}
