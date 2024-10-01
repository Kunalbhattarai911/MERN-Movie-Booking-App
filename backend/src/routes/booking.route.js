import express from "express";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated.js";
import { addBooking, getBookingMovies, getSingleBookedMovie } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/:movieID", isUserAuthenticated, addBooking)
router.get("/get", isUserAuthenticated, getBookingMovies)
router.get("/get/:id", isUserAuthenticated, getSingleBookedMovie)

export default router;