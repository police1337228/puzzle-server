const Joi = require("joi");

module.exports = {
  mail(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      name: Joi.string(),
      text: Joi.string(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(400).send({
            error: "Введите верную электронную почту",
          });
          break;

        default:
          res.status(400).send({
            error: "Неверная регистрационная информация. Попробуйте снова",
          });
      }
    } else {
      next();
    }
  },
};
