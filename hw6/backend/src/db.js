import mongoose from 'mongoose';
import User from './models/ScoreCard.js'
export default {
    connect: () => {     
        mongoose
        .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })
        .then((res) => console.log("mongo db connection created"));

        const db = mongoose.connection;
        db.on("error", (err) => console.log(err));
        db.once("open", async () => {
        });
    }
};