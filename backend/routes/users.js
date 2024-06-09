import express from "express";
import { handleNewUser, handleLogin, handleRefresh, handleLogout } from "../controllers/users.js";

const router = express.Router();

router.post("/register", handleNewUser);
router.post("/login", handleLogin);
router.get("/refresh", handleRefresh)
router.get("/logout", handleLogout)

export default router;
