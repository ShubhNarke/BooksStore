require("dotenv").config();
const express = require('express');
const app = express();
app.use(express.json());

const conn = require("./conn/conn");
conn(); // ✅ Connect to MongoDB

const user = require("./routes/user");
const Books = require("./routes/book");


// Routes
app.use("/api/v1", user); 
app.use("/api/v1", Books); 



// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`);
});
