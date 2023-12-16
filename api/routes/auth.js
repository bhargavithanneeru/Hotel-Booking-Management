import express from "express"
import { register, login, forgotpassword,resetpassword } from "../controllers/authController.js";



const router = express.Router();


router.post("/register",register)
router.post("/login",login)
router.post("/forgotpassword",forgotpassword)
router.post("/reset-password",resetpassword)

export default router;