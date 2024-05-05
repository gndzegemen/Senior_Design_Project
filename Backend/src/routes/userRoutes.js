import express from "express";
import { findUser } from "../controller/userInfoController.js";

const router = express.Router();

router.get(`/user/:id`, findUser);


export { router as userInfoRouter };
