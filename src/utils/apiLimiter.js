import { rateLimit } from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 3,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Слишком много запросов, попробуйте ещё раз через 1 минуту",
  handler: (req, res, next, options) =>
    res.status(options.statusCode).send({ errors: [options.message] }),
});

export default apiLimiter;
