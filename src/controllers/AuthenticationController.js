const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      delete user.dataValues.password;
      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "Данная электронная почта уже используется",
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(403).send({ error: "Неверный логин или пароль" });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(403).send({ error: "Неверный логин или пароль" });
      }
      delete user.dataValues.password;
      const userJson = user.toJSON();

      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "При регистрации возникла ошибка. Попробуйте позже",
      });
    }
  },

  async save(req, res) {
    try {
      const { id } = req.body;
      const user = await User.findOne({
        where: {
          id: id,
        },
      });
      if (!user) {
        return res.status(500).send({
          error: "При обновлении возникла ошибка. Попробуйте позже",
        });
      }
      const { fullName, email, birthDate, city, phone, avatarType } = req.body;

      user.set({
        fullName: fullName,
        email: email,
        birthDate: birthDate,
        city: city,
        phone: phone,
        avatarType: avatarType,
      });

      await user.save();

      delete user.dataValues.password;
      const userJson = user.toJSON();

      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "При обновлении возникла ошибка. Попробуйте позже",
      });
    }
  },
};
