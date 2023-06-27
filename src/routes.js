const AuthenticationController = require("./controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");

const MailController = require("./controllers/MailController");
const MailControllerPolicy = require("./policies/MailControllerPolicy");

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

  app.post("/api/mail/", MailControllerPolicy.mail, MailController.mail);

  app.post("/api/mail-register/", MailController.mailRegister);
};
