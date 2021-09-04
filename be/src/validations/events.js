const { Joi } = require('express-validation');

module.exports = {
  createEvent: {
    body: Joi.object({
      firstName: Joi.string().required().max(1).max(64),
      lastName: Joi.string().required().max(1).max(64),
      email: Joi.string().email().required(),
      date: Joi.date().required(),
    }),
  },
};
