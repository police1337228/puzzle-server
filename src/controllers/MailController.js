const nodeMailer = require("nodemailer");

module.exports = {
  async mail(req, res) {
    const { email, name, text } = req.body;
    try {
      const transporter = nodeMailer.createTransport({
        host: "mail.hosting.reg.ru",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_LOGIN,
          pass: process.env.EMAIL_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: "PuzzleSignLanguage <admin@puzzlesignlanguage.ru>",
        to: process.env.EMAIL_MAIN,
        subject: "Вопрос/предложение по сайту ПАЗЛ",
        html: `От пользователя ${name}, Email: ${email}, пришел вопрос/предложение: <br> <b>${text}</b>`,
      });
      res.status(200).send({
        text: "Успешно отправлено!",
      });
    } catch (e) {
      res.status(400).send({
        text: e,
      });
    }
  },
  async mailRegister(req, res) {
    const { email, name, birthDate, mailAgree } = req.body;
    try {
      const transporter = nodeMailer.createTransport({
        host: "mail.hosting.reg.ru",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_LOGIN,
          pass: process.env.EMAIL_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: "PuzzleSignLanguage <admin@puzzlesignlanguage.ru>",
        to: process.env.EMAIL_MAIN,
        subject: "Новый зарегестрированный пользователь на сайте ПАЗЛ!",
        html: `Зарегестрирован новый пользователь: <br><b>ФИО:</b> ${name} <br><b>Дата рождения:</b> ${birthDate} <br><b>Email:</b> ${email} <br> <b>Согласие на рассылку:</b> ${mailAgree}`,
      });
      res.status(200).send({
        text: "Успешно отправлено!",
      });
    } catch (e) {
      res.status(400).send({
        text: e,
      });
    }
  },
};
