import AuthService from "../services/authService.js";
import MailService from "../services/mailService.js";

class AuthController {
  async preSignUp(req, res, next) {
    try {
      const { email } = req.body;
      const { success, activationMessage } = await AuthService.preSignUp(email);

      await MailService.sendActivationMail(email);

      return res.json({ success });
    } catch (error) {
      next(error);
    }
  }

  async signUp(req, res, next) {
    try {
      const { name, surname, email, activationMessage } = req.body;

      const result = await AuthService.signUp(
        name,
        surname,
        email,
        activationMessage
      );

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async preSignIn(req, res, next) {
    try {
      const { email } = req.body;
      const { success, activationMessage, name } = await AuthService.preSignIn(
        email
      );

      await MailService.sendActivationMail(email);

      return res.json({ success });
    } catch (error) {
      next(error);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, activationMessage } = req.body;

      const result = await AuthService.signIn(email, activationMessage);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = req.user;

      const result = await AuthService.getUser(user);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async changeUserRole(req, res, next) {
    try {
      const { id } = req.body;
      const user = req.user;

      const result = await AuthService.changeUserRole(id, user);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
