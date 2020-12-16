const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//import routes
const authRoutes = require('./routes/auth')
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category');

//app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB CONNECTED'))
.catch((err) => console.log('MONGODB COULD NOT CONNECT', err));

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '2mb'}));
app.use(cors());

//routes middleware
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoute);
app.use('/api/category', categoryRoute);


//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log('server is running on port', port));