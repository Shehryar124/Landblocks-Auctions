import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            max: 50,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            min: 5,
        },

        ActiveBid: {
            type: Number,
            default: 0,
        },

        HighestBid: {
            type : Boolean,
            default : false,
        },
    },
    {timestamps: true}
)

const User = mongoose.model("User", userSchema);

export default User;