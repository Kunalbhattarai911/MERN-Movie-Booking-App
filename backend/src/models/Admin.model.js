import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    addMovies : [
    {
    type : String
    }
    ]
})

const Admin = mongoose.model("Admin", adminSchema);

export default Admin