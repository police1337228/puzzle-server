module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || "puzzle",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "1234",
    options: {
      dialect: process.env.DIALECT || "mysql",
      host: process.env.HOST || "localhost",
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
};
