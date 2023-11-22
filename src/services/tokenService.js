import jwt from "jsonwebtoken";

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30d",
    });

    return accessToken;
  }

  checkToken(token) {
    const userData = jwt.decode(token);

    return userData;
  }
}

export default new TokenService();
