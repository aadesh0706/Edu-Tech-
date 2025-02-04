// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const path = require('path')
// const cookieparser = require("cookie-parser")
// const app = express();
// const port =5000;
// mongoose.set('strictQuery', false);


// // connect to MongoDB mongodb:// mongodb+srv://
// mongoose.connect("mongodb+srv://aadeshgulumbe3:Aadesh123@cluster0.izx25hd.mongodb.net/edu-tech", {
//     // // mongoose.connect("mongodb+srv://kunalgunavare96:kunal@edutech.m2xhjnh.mongodb.net/", {
//     // mongoose.connect("mongodb+srv://aadeshgulumbe3:Aadesh123@cluster0.izx25hd.mongodb.net/edu-tech", {
//     useNewUrlParser: true
// })
//     .then(() => console.log("MongoDb is connected")) 
//     // .then(()=> console.log('http://localhost:8090'))
//     .catch(err => console.log(err))

// // set up EJS as the view engine
// app.set('view engine', 'ejs');

// // set up body parser middleware
// app.use(cookieparser())
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "views")))

// const staticpath = path.join(__dirname, "/public")
// app.use(express.static(staticpath))
// // include routes 
// const routes = require('./routes');
// app.use('/', routes);

// // start the server
// const PORT = process.env.PORT || port ;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// console.log('http://localhost:8090');

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const port = 5000;
mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://aadeshgulumbe3:Aadesh123@cluster0.izx25hd.mongodb.net/edu-tech", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set static folders
app.use(express.static(path.join(__dirname, "public")));

// Include routes
const routes = require("./routes");
app.use("/", routes);

// Export the app for Vercel
module.exports = app;
