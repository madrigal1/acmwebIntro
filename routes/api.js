const express =require("express");
const fetch = require("node-fetch");
const router =express.Router();



//temperature convertor
router.get('/tempConv',(req,res)=>{
    let data = {};
    switch(req.query.mode) {
        case 'cf':  data["answer"] = (9/5)*req.query.value+32;
                    break;
        case 'fc':  data["answer"] = (5/9)*(req.query.value-32);
                    break;
        default:   data["answer"] = "error";
    }
   res.send(data);
});


const convertor = (d,b) => Number(d).toString(Number(b)).toUpperCase();


//base convertor
// /baseConv?num=value
router.get('/baseConv',(req,res)=>{
     res.writeHeader(200,{'content-type':'application/json'});
     let data = {};
     let num =req.query.value;
     data = {
         binary : convertor(num,2),
         octal : convertor(num,8),
         hexadecimal: convertor(num,16)
     } 
     res.end(JSON.stringify(data))
});




const getUserData = async (url,settings)=>{
    let response =  await fetch(url,settings);
    let data = response.json();
    return data;
} 

// /githubExo/user
router.get('/githubExp/:user',(req,res)=> {
    res.writeHeader(200,{"content-type":'application/json',"Accept":"application/vnd.github.v3+json"});
    let url = `https://api.github.com/users/${req.params.user}`;
    let settings = {method:'GET'};
    getUserData(url,settings)
            .then(data => res.end(JSON.stringify(data)));        
})



module.exports = router;