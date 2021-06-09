const express = require('express');
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const { database } = require("../config/default");
const indexRouter = require("../routes/index");
//midlewares
app.use(cors());
app.use(express.json());


//Configuration
app.use(morgan('dev'));
app.set("port", process.env.PORT || 4200);
app.use("/", indexRouter);


app.get('/', (req,res,next) =>{
    res.send("hola que tal mi jente");
} )



module.exports = app;