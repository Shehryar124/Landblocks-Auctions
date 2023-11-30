import Item from '../models/Item.js';
import mongoose from 'mongoose';


export const createAuction = async (req,res) => {
    try {
        const {title, location, image, highestBidValue, highestBidder, seller, endTime} = req.body;
        const item = new Item({
            title: title,
            location: location,
            image: image,
            highestBidValue: highestBidValue,
            highestBidder: highestBidder,
            seller: new mongoose.Types.ObjectId(seller),
            endTime: endTime,
        })
        await item.save();
        res.status(201).json({msg: "Auction Created"});
    }
    catch (error) {
        console.error("Error creating auction:", error);
        res.status(500).json({msg: "Internal Server Error"});
    }
}


export const fetchAuction = async (req,res) => {
    try {
        const foundAuctions = await Item.find({}).populate('seller');
        console.log(foundAuctions);
        if (foundAuctions) {
            res.status(200).json(foundAuctions);
        } else {
            res.status(404).json({err: "no items found"});
        } 
    }
    catch {
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const updateAuction = async (req, res) => {
    const {highestBid, winningBidder, auctionID} = req.body;

    try {
        const updatedAuction = await Item.findByIdAndUpdate(auctionID, {
            highestBidder: winningBidder, 
            highestBidValue: highestBid,
        }, {new: true});
        
        if (updatedAuction) {
            res.status(200).json({message: "Auction updated successfully"});
        }
        else {
            res.status(404).console.log("Problem with updating the auction");
        }
    }
    catch (e) {
        res.status(500).send({msg: "internal server error"})
    }
}
