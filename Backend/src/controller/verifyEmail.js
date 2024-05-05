import { UserModel } from "../models/UsersInfos.js";
import { Token } from "../models/token.js";

const verifyEmail = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token });
    console.log(token);

    await UserModel.updateOne(
      { _id: token.userId },
      { $set: { verified: true } }
    );
    res.send("email verified");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
export { verifyEmail }