const AuthenticationController = require("./controllers/AuthenticationController");

const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");

module.exports = (app) => {
  app.post(
    "/api/register/",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  );

  app.post("/api/login/", AuthenticationController.login);

  app.put(
    "/api/save/",
    AuthenticationControllerPolicy.save,
    AuthenticationController.save
  );
};
