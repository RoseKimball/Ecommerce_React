const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

//app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
.then(() => console.log('DB CONNECTED'))
.catch((err) => console.log('MONGODB COULD NOT CONNECT', err));

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '2mb'}));
app.use(cors());

//routes middleware
// app.use('/api', authRoutes);
fs.readdirSync('./routes').map((r) => 
    console.log(r)
    app.use('/api', require('./routes/' + r))
)


//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log('server is running on port', port));