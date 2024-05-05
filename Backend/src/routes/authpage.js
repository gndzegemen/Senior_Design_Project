import  express  from "express";
import { registerUser } from "../controller/registerUser.js";
import { loginUser } from "../controller/loginUser.js";
import { verifyEmail } from "../controller/verifyEmail.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:token", verifyEmail);

export { router as userRouter };

