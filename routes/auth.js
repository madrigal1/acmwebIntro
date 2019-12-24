const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const  {registerValidation,loginValidation} = require("../validation.js");
const jwt =  require("jsonwebtoken");


//User signup
router.post('/register',async (req,res,next)=> {
    const error= await registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
         

  const emailExists = await User.findOne({email:req.body.email});
  if(emailExists) return res.status(404).send('email exists') ;
   
 savedUser = req.body;
 const salt = await bcrypt.genSaltSync(10);
 const hashedPwd = await bcrypt.hashSync(savedUser.pwd,salt);
 savedUser.pwd = hashedPwd;
 console.log(savedUser);
   try {
        const dbUser = await User.create(savedUser);
        res.end(JSON.stringify(dbUser));
        } catch (err) {
            res.status(400).end(err);
        }
})



router.post('/login',async (req,res)=> {

       const {error} = loginValidation(req.body);
       if(error) return res.status(404).send(error.details[0].message);


       const user = await User.findOne({email:req.body.email});
       if(!user) return res.status(404).send('User does not exist');
       
       const validPassword = await bcrypt.compare(req.body.pwd,user.pwd);
       if(!validPassword) return res.status(404).send('invalid password');

       const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRECT);
       res.header('auth-token',token).send(token);
})


module.exports = router;