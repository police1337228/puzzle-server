const Joi = require("joi");

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}$")),
      fullName: Joi.string(),
      birthDate: Joi.string(),
      phone: Joi.string().allow(null),
      city: Joi.string().allow(null),
      avatarType: Joi.string().allow(null),
      mailAgree: Joi.string(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(400).send({
            error: "Введите верную электронную почту",
          });
          break;
        case "password":
          res.status(400).send({
            error:
              "Пароль должен быть от 8 до 32 символов, а также содержать только латинские буквы и цифры",
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
  save(req, res, next) {
    const schema = Joi.object({
      id: Joi.number(),
      email: Joi.string().email(),
      fullName: Joi.string(),
      birthDate: Joi.string(),
      phone: Joi.string().allow(null),
      city: Joi.string().allow(null),
      avatarType: Joi.string().allow(null),
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
            error:
              "Неверная обновленная информация информация. Попробуйте снова",
          });
      }
    } else {
      next();
    }
  },
};
