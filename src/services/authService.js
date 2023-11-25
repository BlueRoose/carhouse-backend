import UserDto from "../dtos/userDto.js";
import { User, Message } from "../models/models.js";
import TokenService from "./tokenService.js";
import ApiError from "../exceptions/apiError.js";

class AuthService {
  async preSignUp(email) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest([
        "Пользователь с таким почтовым адресом уже существует",
      ]);
    }

    const item = await Message.findOne({ where: { email } });

    const activationMessage = Math.floor(
      Math.random() * (99999 - 10000 + 1) + 10000
    );
    if (item) {
      await Message.update({ activationMessage }, { where: { email } });
    } else {
      await Message.create({ email, activationMessage });
    }

    return {
      success: true,
      activationMessage,
    };
  }

  async signUp(name, surname, email, activationMessage) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest([
        "Пользователь с таким почтовым адресом уже существует",
      ]);
    }

    const message = await Message.findOne({ where: { email } });
    if (activationMessage !== message.activationMessage) {
      throw ApiError.BadRequest(["Неверный код"]);
    }

    const user = await User.create({ name, surname, email });

    const userDto = new UserDto(user);
    const token = TokenService.generateToken({ ...userDto });
    return {
      token,
      user: userDto,
    };
  }

  async preSignIn(email) {
    const candidate = await User.findOne({ where: { email } });
    if (!candidate) {
      throw ApiError.BadRequest([
        "Пользователя с таким почтовым адресом не существует",
      ]);
    }

    const activationMessage = Math.floor(
      Math.random() * (99999 - 10000 + 1) + 10000
    );
    await Message.update({ activationMessage }, { where: { email } });

    return {
      success: true,
      activationMessage,
      name: candidate.name,
    };
  }

  async signIn(email, activationMessage) {
    const message = await Message.findOne({ where: { email } });
    if (activationMessage !== message.activationMessage) {
      throw ApiError.BadRequest(["Неверный код"]);
    }

    const user = await User.findOne({ where: { email } });

    const userDto = new UserDto(user);
    const token = TokenService.generateToken({ ...userDto });

    return {
      token,
      user: userDto,
    };
  }

  async getUser(user) {
    const candidate = await User.findOne({ where: { email: user.email } });
    if (!candidate) {
      throw ApiError.BadRequest(["Такого пользователя не существует"]);
    }
    const userDto = new UserDto(candidate);

    return {
      user: userDto,
    };
  }

  async changeUserRole(candidateId, user) {
    const candidate = await User.findOne({ where: { id: candidateId } });
    if (candidate.role === "MODERATOR") {
      throw ApiError.BadRequest(["Пользователь уже является модератором"]);
    }

    const author = await User.findOne({ where: { id: user.id } });
    if (author.role === "ADMIN") {
      await User.update({ role: "MODERATOR" }, { where: { id: candidateId } });
    }

    return {
      success: true,
    };
  }
}

export default new AuthService();
