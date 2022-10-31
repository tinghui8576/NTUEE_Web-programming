import axios from 'axios'
const instance = axios.create({
    baseURL : 'http://localhost:4000/api/guess'
})

// const check = async() =>{
//     instance.get("/guess")
// }
//instance.get('').catch(function(error,req,res){res.send(503)})
const startGame = async()=>{
    const{ data:{msg}} = await instance.post('/start')
    return msg
}

const guess = async(number) =>{
    try {
        const{data:{msg}} = await instance
        .get('/guess', {params:{number}})
        return msg;
    }
    catch (error){
        if(error.message === "Request failed with status code 406"){
            console.log('here')
            var msg = number+' is not a valid number (1-100)'
        }
        else{
            instance.response.status(503).send({ msg: 'server not responding or not connected' })
            //var msg ='server not responding or not connected'
        }
        
        return msg;
    }
}
const restart = async()=> {
    const{ data:{msg}} = await instance.post('/start')
    return msg
}


export{startGame, guess, restart}