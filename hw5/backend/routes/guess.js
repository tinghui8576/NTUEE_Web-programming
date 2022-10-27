import express from 'express'
import {getNumber,genNumber} from './../core/getNumber.js'
const router = express.Router()


router.post('/start', (_, res) => {
    genNumber()
    res.json({msg: 'The game has started.'})
})
router.get('/guess', (req, res) => {
    var get = req.query.number;
    var num = getNumber();
    if(parseInt(get) <=100 && parseInt(get) >=0){
        
        console.log(get, num)
        if (parseInt(get) === num){
            res.status(202).send({ msg: 'Equal'})
        }
        else if( parseInt(get) < num){
            res.status(200).send({ msg: 'Bigger' })
        }
        else if( parseInt(get) > num){
            res.status(200).send({ msg: 'Smaller' })
        }
    }
    else{
        
        res.status(406).send({ msg: 'Not a legal number.' })
        console.log('not')
    }
})


router.post('/restart', (_,res) => {
    genNumber()
    res.json({msg:'The game has started.'})
})

export default router