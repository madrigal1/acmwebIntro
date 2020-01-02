const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/posts.js");
const apiCoreRoute = require("./routes/api.js");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;




dotenv.config();

//mongoose
mongoose.connect(
    process.env.DB_CONNECT,
     { useNewUrlParser: true ,useUnifiedTopology: true } ,
     () => {console.log("DB connected")}
 ).catch((err)=> {
     console.log(err);
 });

app.use(cors());
app.use(express.json());
app.use('/api',apiCoreRoute),
app.use('/api/users',authRoute);
app.use('/api/posts',postRoute);

/* 
app.use((err,req,res,next)=> {
     if(err.isServer) {
         console.log(err);
     }
     return res.status(err.output.statusCode).json(err.output.payload);
}); */

app.listen(port,()=> {
    console.log(`server started at ${port}`);
});