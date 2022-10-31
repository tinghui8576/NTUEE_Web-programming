import express from 'express'
import ScoreCard from "../models/ScoreCard";
const router = express.Router()

router.post('/card', (req,res) =>{

    const saveUser = async (name, subject, score) => {
        const existing = await ScoreCard.findOne({ name });
        if (existing) {
            if (name === existing.name && subject === existing.subject)
                throw new Error(`data ${name} exists!!`)
            else{
                existing.subject = subject;
                existing.score = score;
                //const newUser = new ScoreCard({ name, subject, score});
                console.log("Created user", existing);
                res.status(200).send({
                    message:"Updating (" + Name + ", " + Subject +", " +Score +")", 
                    card: ScoreCard})
                return existing.save();
            }
                
        };
        try {
            const newUser = new ScoreCard({ name, subject, score});
            res.status(200).send({
                message:"Adding (" + Name + ", " + Subject +", " +Score +")", 
                card: ScoreCard})
            console.log("Created user", newUser);
            return newUser.save();
        } 
        catch (e) { throw new Error("User creation error: " + e); }
    };

    var Name = req.body.name;
    var Subject = req.body.subject;
    var Score = req.body.score;
    console.log(Name,Subject,Score)
    saveUser(Name,Subject,Score);

    
})

router.delete('/cards', (_,res) =>{

    const deleteDB = async () => {
        try {
        await ScoreCard.deleteMany({});
        console.log("Database deleted");
        } catch (e) { throw new Error("Database deletion failed"); }
    };

    deleteDB();

    res.status(200).send({message:"Database cleared"})
})
router.get('/cards', (req,res) =>{
    var Name = req.body.name;
    var Subject = req.body.subject;
    var Score = req.body.score;

    
    //console.log(get)
    res.json({})
})

export default router;
