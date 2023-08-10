import express from "express";
import {
  getAllUsers,
  getSingleUser,
  addUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(addUser);
router.route("/:id").get(getSingleUser)

export default router;