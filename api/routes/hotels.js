import express from "express"
import {createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms } from "../controllers/hotelController.js"
import {verifyAdmin, verifyUser} from "../utils/verifyToken.js"
import Hotel from "../models/Hotel.js"


const router = express.Router();

//CREATE
// add middleware admin verification "verifyAdmin"
router.post("/", verifyAdmin, createHotel)

//UPDATE
router.put("/:id", verifyAdmin, updateHotel)

//DELETE

router.delete("/:id",verifyAdmin, deleteHotel)

//GET
//every user can get hotel
router.get("/find/:id", getHotel)

//GET ALL
//every user can get all the hotels
router.get("/", getHotels)


router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)



export default router;