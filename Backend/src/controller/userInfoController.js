import { UserModel } from "../models/UsersInfos.js";

const findUser = async (req, res) => {
 
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      res.json({ userID: user._id, username: user.username ,email: user.email, verified: user.verified });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "Internal server error occurred while retrieving user.",
      });
  }
};

export { findUser };
