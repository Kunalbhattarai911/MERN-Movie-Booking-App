import Booking from "../models/Booking.model.js";
import Movie from "../models/Movie.model.js";

export const addBooking = async (req, res) => {
  try {
    const userId = req.id; 
    const { movieID } = req.params; 
    const { date, seatNumber } = req.body; 

    // Check if the movie exists
    const existingMovie = await Movie.findById(movieID);
    if (!existingMovie) {
      return res.status(404).json({
        message: "Movie Not Found",
        success: false,
      });
    }

    // Check the total seat Number
    if (seatNumber > existingMovie.totalSeats || seatNumber <= 0) {
      return res.status(400).json({
        message: `Invalid seat number. Please select a seat number between 1 and ${existingMovie.totalSeats}.`,
        success: false,
      });
    }

    // Check if the seat is already booked for this movie and date
    const existingBooking = await Booking.findOne({
      movie: movieID,
      date: new Date(date),
      seatNumber,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: `Seat number ${seatNumber} is already booked for this movie on the selected date.`,
        success: false,
      });
    }

    // Create a new booking if the seat is not booked,
    const newBooking = new Booking({
      movie: movieID,
      userID: userId,
      date: new Date(date),
      seatNumber,
    });

    await newBooking.save();

    // Add the booking ID to the movie's bookings array
    existingMovie.bookings.push(newBooking._id);
    await existingMovie.save();

    return res.status(201).json({
      message: "Booking Added Successfully",
      success: true,
      newBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};


export const getBookingMovies = async (req, res) => {
    try {
      const userId = req.id; 
  
      // Find all bookings for this user
      const bookingMovies = await Booking.find({ userID: userId }).populate('movie'); 
  
      // If no bookings are found, return a 404 response
      if (!bookingMovies || bookingMovies.length === 0) {
        return res.status(404).json({
          message: "No booked movies found for this user.",
          success: false,
        });
      }
  
      // Return the list of booked movies
      return res.status(200).json({
        message: "List of Booked Movies",
        success: true,
        bookingMovies,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while retrieving the booked movies.",
        success: false,
        error: error.message,
      });
    }
  };

  export const getSingleBookedMovie = async (req,res) => {
    try {
        const userId = req.id; 
        const {id} = req.params;
    
        // Find all bookings for this user
        const bookingMovies = await Booking.findOne({ userID: userId, _id: id }).populate('movie'); 
    
        // If no bookings are found, return a 404 response
        if (!bookingMovies || bookingMovies.length === 0) {
          return res.status(404).json({
            message: "No booked movies found for this user.",
            success: false,
          });
        }
    
        // Return the list of booked movies
        return res.status(200).json({
          message: "List of Booked Movies",
          success: true,
          bookingMovies,
        });
    
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "An error occurred while retrieving the booked movies.",
          success: false,
          error: error.message,
        });
      }
  }
