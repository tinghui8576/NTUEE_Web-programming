// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    

    // TODO Part I-3-a: find the information to all restaurants
    // db.collection.find({priceFilter}).exec(err, data) {
    //     console.log(data)
    // }
    var data =[]
    
    if (!priceFilter && !mealFilter && !typeFilter){
        Info.find().exec((err, resta) =>{
            console.log('all')
            if(err){
                console.log(err);
                res.status(403).send({ message: 'error', contents: ""})
            }
            
            else{
                if (sortBy === 'price'){
                    resta.sort(function(first, second) {
                        return  first.price - second.price;
                       });
                }
                else if(sortBy === 'distance'){
                    resta.sort(function(first, second) {
                        return  first.distance - second.distance;
                       });
                }
                resta.forEach((i)=>{
                    data =[...data,i]
                })
                // console.log(data)
                res.status(200).send({ message: 'success', contents: data})
                
            }
            
        })
    }
    else{
        // var pdata =[]
        // var tdata =[]
        // var mdata = []
        // console.log('filt')
        // if(priceFilter){
        //     priceFilter.forEach((p)=>{
                
        //         Info.find({price:p}).exec((err, resta) =>{
        //             if(err){
        //                 console.log(err);
        //                 res.status(403).send({ message: 'error', contents: ""})
        //             }
                            
        //             else{
        //                 resta.forEach((i)=>{
        //                     pdata =[...pdata,i]
        //                 })
        //                 console.log('pricce', pdata)
        //                 res.status(200).send({ message: 'success', contents: data})
                                
        //             }
                            
        //         })
                    
                
        //     })
        // }
        // if (mealFilter){
        //     mealFilter.forEach((p)=>{
        //         Info.find({tag:p}).exec((err, resta) =>{
        //             console.log(resta)
        //             if(err){
        //                 console.log(err);
        //                 res.status(403).send({ message: 'error', contents: ""})
        //             }else{
        //                 mdata =[...mdata,resta]
        //                 console.log('meal',mdata)
        //                 res.status(200).send({ message: 'success', contents: data})
                        
        //             }
                    
        //         })
        //     })
            
        // }
        // if (typeFilter){
        //     typeFilter.forEach((p)=>{
        //         Info.find({tag:p}).exec((err, resta) =>{
        //             if(err){
        //                 console.log(err);
        //                 res.status(403).send({ message: 'error', contents: ""})
        //             }else{
        //                 tdata =[...tdata,resta]
        //                 //console.log('type', tdata)
        //                 res.status(200).send({ message: 'success', contents: data})
                        
        //             }
                    
        //         })
        //     })
            
        // }
        // // if(pdata && mdata){
        // //     var intersection = pdata.filter(element => mdata.includes(element));
        // //     intersection = pdata.filter(element => mdata.includes(element));
            
        // //     console.log(intersection)
        // //     //res.status(200).send({ message: 'success', contents: intersection})
        // // }
    }
 
    
    
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}
exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/
    
    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
    Info.findById(id).exec((err, resta) =>{
        console.log(resta)
    })
}