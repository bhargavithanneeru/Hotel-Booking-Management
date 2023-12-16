import express from "express"
import {verifyAdmin, verifyUser} from "../utils/verifyToken.js"
import {createRoom, updateRoom, deleteRoom, getRoom, getRooms, updateRoomAvailability } from "../controllers/roomController.js"
const router = express.Router();


//CREATE
// add middleware admin verification "verifyAdmin"
router.post("/:hotelid", verifyAdmin, createRoom)

//UPDATE
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)

//DELETE

router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)

//GET
//every user can get Room
router.get("/:id", getRoom)

//GET ALL
//every user can get all the Rooms
router.get("/", getRooms)

export default router;