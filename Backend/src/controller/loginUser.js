import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UsersInfos.js";
import { v4 as uuidv4 } from "uuid";
import { loginFormCheck } from "../utils/validationSchemas.js";

const loginUser = async (req, res) => {
  try {
    const validData = await loginFormCheck.validateAsync(req.body);
    const { username, password } = validData;
    let user;

    try {
      user = await UserModel.findOne({ username });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error occurred while retrieving user." });
    }

    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    let isPasswordValid;

    try {
      isPasswordValid = await bcrypt.compare(password, user.password);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error occurred while comparing passwords." });
    }

    if (isPasswordValid && user.verified) {
      const token = jwt.sign({ id: user._id }, "secret");
      const expiration = 24 * 60 * 60 * 1000; // 1 day
      const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + expiration),
        sameSite: "strict",
      };
      const cookieToken = uuidv4();
      res.cookie("jwtToken", cookieToken, cookieOptions);
      res.header("Access-Control-Expose-Headers", "Set-Cookie, Authorization");
      res.header("Authorization", `Bearer ${token}`);
      res.json({ token, userID: user._id });
    } else {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
  } catch (err) {
    if (err.isJoi) { // handle validation errors
      res.status(400).json({ message: err.details[0].message });
    } else { // handle all other errors
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

export { loginUser };
