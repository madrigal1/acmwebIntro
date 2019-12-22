const express = require("express");


const app = express();
const port = process.env.PORT || 3000;

app.use('/api',require("./routes/api.js"));

app.listen(port,()=> {
    console.log(`server started at ${port}`);
});