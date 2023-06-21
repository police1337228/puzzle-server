const Promise = require("bluebird");
const bcrpyt = Promise.promisifyAll(require("bcrypt-nodejs"));

function hashPassword(user, options) {
  const SALT_FACTOR = 8;

  if (!user.changed("password")) {
    return;
  }

  return bcrpyt
    .genSaltAsync(SALT_FACTOR)
    .then((salt) => bcrpyt.hashAsync(user.password, salt, null))
    .then((hash) => {
      user.setDataValue("password", hash);
    });
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fullName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      city: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: true },
      avatarType: { type: DataTypes.STRING, allowNull: true },
      birthDate: DataTypes.DATEONLY,
      mailAgree: { type: DataTypes.STRING, default: "0" },
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    }
  );

  User.prototype.comparePassword = async function (password) {
    return bcrpyt.compareAsync(password, this.password);
  };

  return User;
};
