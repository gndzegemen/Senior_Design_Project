import express from "express";
import { fetchItems, fetchItem } from "../controller/itemController.js";

const router = express.Router();


router.get(`/data`, fetchItems);
router.get(`/data/:id`, fetchItem);

export { router as itemRouter };
