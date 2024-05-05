import bcrypt from "bcrypt";
import { UserModel } from "../models/UsersInfos.js";
import { Token } from "../models/token.js";
import crypto from "crypto";
import { verifMails } from "../utils/sendEmail.js";
import { registerFormCheck } from "../utils/validationSchemas.js";


const registerUser = async (req, res) => {
  try {
    const validData = await registerFormCheck.validateAsync(req.body);

    const { username, email, password } = validData;
    let user;

    try {
      user = await UserModel.findOne({ username });
    } catch (err) {
      return res
        .status(500)
        .json({
          message: "Internal server error occurred while retrieving user.",
        });
    }

    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res
        .status(500)
        .json({
          message: "Internal server error occurred while hashing password.",
        });
    }

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    try {
      await newUser.save();
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal server error occurred while saving user." });
    }

    let token;
    try {
      token = await new Token({
        userId: newUser._id,
        token: crypto.randomBytes(16).toString("hex"),
      }).save();
    } catch (err) {
      return res
        .status(500)
        .json({
          message: "Internal server error occurred while saving token.",
        });
    }
    //http://localhost:3001/
    const link = `https://api.ejderyaa.com/${token.token}`;

    try {
      await verifMails(email, link);
    } catch (err) {
      return res
        .status(500)
        .json({
          message:
            "Internal server error occurred while sending verification email.",
        });
    }

    res.json({ message: "User registered successfully" });
  } catch (err) {
    if (err.isJoi) {
      console.log(err.details[0].message)
      res.status(400).json({ message: err.details[0].message });
    } else {
      // handle all other errors
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

export { registerUser };
