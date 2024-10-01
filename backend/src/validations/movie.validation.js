import Joi from "joi";

export const movieRegister = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).max(200).required(),
    releaseDate: Joi.date().required(),
    posterUrl: Joi.string().min(1).max(100).required(),
    featured: Joi.boolean(),
    bookings: Joi.array().items(Joi.string()),
    totalSeats: Joi.number().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      success: false,
      error: error.message,
    });
  }

  next();
};

export const movieUpdate = (req,res,next) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100),
    description: Joi.string().min(1).max(200),
    releaseDate: Joi.date(),
    posterUrl: Joi.string().min(1).max(100),
    featured: Joi.boolean(),
    bookings: Joi.array().items(Joi.string()),
    totalSeats: Joi.number()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      success: false,
      error: error.message,
    });
  }

  next();
};

