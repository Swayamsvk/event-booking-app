const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");

require('dotenv').config();

const app = express();
const users = require("./routes/api/users");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true,useCreateIndex:true }
);

const connection = mongoose.connection;
connection.once('open',() => {
    console.log("Mongodb connection is established")
})

//Passport middleware
app.use(passport.initialize());
//Passport config
require("./config/passport")(passport);

app.use("/api/users",users);

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
});