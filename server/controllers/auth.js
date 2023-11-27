import User from '../Models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const {fullname, email, password, ActiveBid, HighestBid} = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const user = new User ({
                    fullname: fullname,
                    email: email,
                    password: passwordHash,
                    ActiveBid: ActiveBid,
                    HighestBid: HighestBid,
                })
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const signin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({ msg: "user does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({msg: "invalid credentials"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user})
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
}