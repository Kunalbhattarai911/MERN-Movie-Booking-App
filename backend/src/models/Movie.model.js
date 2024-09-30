import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  bookings: [
    {
      type: String,
    },
  ],
  adminId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Admin',
    required : true
  }
});

const Movie = mongoose.model("Movie", movieSchema)

export default Movie;