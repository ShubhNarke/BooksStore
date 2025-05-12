const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config();
require("./conn/conn");
const user = require("./routes/user");


// routes

app.use("/api/v1",user);

//  creating port 
app.listen(process.env.PORT,()=>{
    console.log(`server Started at ${process.env.PORT}`);
});

