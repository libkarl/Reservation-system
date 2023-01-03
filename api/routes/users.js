import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
/* // CHECK AUTH
router.get("/checkauth", verifyToken, (req, res, next) => {
  res.send("hello user, you are logedin");
});

router.get("/checkauth/:id", verifyUser, (req, res, next) => {
  res.send("hello user, you are logged in and you can delete your account");
}); */

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
