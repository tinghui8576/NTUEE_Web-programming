import express from 'express'
import ScoreCard from "../models/ScoreCard";
const router = express.Router()

router.post('/card', (req,res) =>{

    const saveUser = async (name, subject, score) => {
        ScoreCard.find({ name: name, subject: subject },(error, user) => {
            if(error){
                console.log(error);
            }else{
                console.log
                if(!user.length){
                    try {
                        const newUser = new ScoreCard({ name, subject, score});
                        res.status(200).send({
                            message:"Adding (" + Name + ", " + Subject +", " +Score +")", 
                            card: newUser})
                        console.log("Created user", newUser);
                        return newUser.save();
                    } 
                    catch (e) { throw new Error("User creation error: " + e); }
                }else{
                    console.log("User exists.");
                    user[0].score = score;
                    console.log(user[0])
                    res.status(200).send({
                        message:"Updating (" + Name + ", " + Subject +", " +Score +")", 
                        card: user[0]})
                    return user[0].save();
                }
            }
        });
    };

    var Name = req.body.name;
    var Subject = req.body.subject;
    var Score = req.body.score;
    console.log('User',Name,Subject,Score)
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
    var Type = req.query.type;
    console.log(Type, req.query.queryString)

    const foundprint = async (error, user) => {
        if(error){
            console.log(error);
        }else{
            if(!user.length){
                res.status(200).send({
                    message:Type+"("+ req.query.queryString +") not found!",
                    messages:''
                })
            }else{
                var data =[];
                for (let i= 0; i < user.length; i++){
                    var Name = user[i].name;
                    var Subject = user[i].subject;
                    var Score = user[i].score;
                    console.log(Name, Subject, Score)
                    data.push("Found card with "+Type +": (" + Name + ", " + Subject +", " +Score +")")
                }
                res.status(200).send({
                    message:"",
                    messages:data
                })
            }
        }
    };

    if(Type === 'subject'){
        ScoreCard.find({ subject:  req.query.queryString},(error,  user) => {
            foundprint(error, user)
        });
    }
    else if(Type === 'name'){
        ScoreCard.find({ name: req.query.queryString},(error, user) => {
            foundprint(error, user)
        });
    }
    
})

export default router;
