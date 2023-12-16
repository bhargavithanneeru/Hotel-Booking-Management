import express from "express"
import { updateUser, deleteUser, getUser, getUsers} from "../controllers/userController.js";
import { verifyToken, verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import cookieParser from 'cookie-parser';
const router = express.Router();


// Apply cookie-parser middleware for this router


// Custom middleware to log cookies




//CHECk AUTHENTICATION
// verifies the token using verifyToken and continues with the next function
// router.get("/checkauthentication", verifyToken, (req, res, next)=>{
//     res.send("Hello user, you are logged in")

// })

// router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
//     res.send("Hello user, you are logged in and you can delete your account")

// })

// router.get("/checkadmin/:id", verifyToken, (req, res, next)=>{
//     res.send("Hello admin, you are logged in and you can delete all the accounts ")

// })

//UPDATE
// add verification middleware (verifyUser)
//router.put("/:id", updateUser)
router.put("/:id",verifyUser, updateUser)

//DELETE

router.delete("/:id",deleteUser)
// router.delete("/:id",verifyUser,deleteUser)

//GET
router.get("/:id", getUser)
//router.get("/:id",verifyUser, getUser)

//GET ALL
// only admin can get all the accounts
router.get("/", verifyAdmin,getUsers)



router.post('/verify', verifyToken, (req, res) => {
    // Authentication successful
    res.status(200).json({ message: 'Authentication successful' });
  });
  

export default router;