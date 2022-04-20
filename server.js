// Setup empty JS object to act as endpoint for all routes

const projectData = {};

// Require Express to run server and routes
const express = require("express")
const bodyParser = require('body-parser')
const path = require('path');
const app = express()
const port = 3000;

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

app.get("/", async(req, res) => {
    res.sendFile(path.join(__dirname,"/website/index.html"))
})

app.get("/test", async (req, res) => {
    
    res.sendFile(path.join(__dirname, "/website/test.html"))
})

app.post("/", async (req, res) => {
})


app.listen(port, () => console.log(`Listen on Port ${port}`))
// Setup Server


