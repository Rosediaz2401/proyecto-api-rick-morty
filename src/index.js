const { json } = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + "/.env"});
const uri = process.env.PROYECTO_URI;
const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/character")
const cors = require('cors')


//middleware

app.options('*', cors());

    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers',
            'X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS');

        next();

    });

app.use(express.json());
app.use('/api',userRoutes)

// routes

app.get("/", (req,res) => {
    res.send('Welcome to my API');
});

//mongodb connection
mongoose.connect(uri,{
    useNewUrlParser: "true",
    useUnifiedTopology: "true"
})
.then(() => console.log('conectado a mongodb atlas'))
.catch((error) => console.log(error))
app.listen(port, () => console.log('server listening on port', port));