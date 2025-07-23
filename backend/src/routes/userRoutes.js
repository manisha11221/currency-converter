import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    getCurrentUser, 
} from "../controller/userController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)

export default router