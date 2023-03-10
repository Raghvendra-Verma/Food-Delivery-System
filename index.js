const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

//DataBAse connection
const mongoDB = require("./db");
mongoDB();

//creating middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.get('/', (req, res) => {
    res.status(200).send("Hello World!");
})

app.use(express.json());
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));

//static files
app.use(express.static(path.join(__dirname, './client/build')));

//getting the static files

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})