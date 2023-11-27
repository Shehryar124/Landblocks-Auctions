import Item from '../models/Item.js';
import mongoose from 'mongoose';


export const createAuction = async (req,res) => {
    try {
        const {title, location, image, highestBidValue, highestBidder} = req.body;
        const item = new Item({
            title: title,
            location: location,
            image: image,
            highestBidValue: highestBidValue,
            highestBidder: highestBidder
        })
        await item.save();
        res.status(201).json({msg: "Auction Created"});
    }
    catch {
        res.status(500).json({msg: "Internal Server Error"});
    }
}


export const fetchAuction = async (req,res) => {
    try {
        const foundAuctions = await Item.find({});
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
