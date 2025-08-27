import ratelimit from "express-rate-limit";

const limiter = ratelimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "terlalu banyak request, ulangi dalam beberapa saat",
});

export default limiter;
