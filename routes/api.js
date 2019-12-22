const express =require("express");
const fetch = require("node-fetch");
const router =express.Router();

//temperature convertor
router.get('/tempConv',(req,res)=>{
    res.writeHead(200,{'content-type':'application/json'});
    let data = {};
    switch(req.query.mode) {
        case 'cf':  data["answer"] = (9/5)*req.query.value+32;
                    break;
        case 'fc':  data["answer"] = (5/9)*(req.query.value-32);
                    break;
        default:   data["answer"] = "error";
    }
    
     res.end(JSON.stringify(data));
});

//base convertor
router.get('/baseConv',(req,res)=>{
     res.writeHeader(200,{'content-type':'application/json'});
     let data = {};
     let num =4;
     let base = 2;
     let ans = [];
     do {
         let rem = num%base;
         ans.push(rem);
         num= Math.floor(num/base);
     }while(num>=base);
     ans.push(num);
     data["ans"] = ans;
     res.end(JSON.stringify(data))
});

let client_id = "59093667348a881aa242";
let client_secret = "ac489455f2c0e576383b89f513403ad885025684";
 


const getUserData = async (url,settings)=>{
    let response =  await fetch(url,settings);
    let data = response.json();
    return data;
} 


router.get('/githubExp/:user',(req,res)=> {
    res.writeHeader(200,{"content-type":'application/json',"Accept":"application/vnd.github.v3+json"});
    let url = `https://api.github.com/users/${req.params.user}`;
    let settings = {method:'GET'};
    getUserData(url,settings)
            .then(data => res.end(JSON.stringify(data)));        
})

module.exports = router;