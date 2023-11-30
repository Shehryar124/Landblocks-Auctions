import { Timestamp } from 'mongodb';
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    image: {
        type: String,
    },

    highestBidValue: {
        type: Number,
        default: 0,
    },

    highestBidder: {
        type: String,
        default: ""
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    endTime: {
        type: Date,
        required: true
    }
},
    {timestamps: true},
)

const Item = mongoose.model("Item", itemSchema);

export default Item;

