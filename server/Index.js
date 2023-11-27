import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import authRoutes from './Routes/auth.js';
import auctionRoutes from './routes/auction.js';
import helmet, { crossOriginResourcePolicy } from 'helmet'
import dotenv from 'dotenv'
import cors from 'cors'

// Configuration/ middleware
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

//Routes middleware
app.use('/auth', authRoutes);
app.use('/card', auctionRoutes);

//Mongoose Setup
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true ,
    useUnifiedTopology: true,
});


//Listening
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})



