const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const app = express();
const dotenv = require('dotenv').config();

// Port
const PORT = process.env.PORT || 3012;

// Routes
const routerApi = require('./categories/index');

// Middleware setup
app.use(morgan('dev'));
app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(cors());
app.use(passport.initialize());

// Router endpoint
app.use('/api', routerApi);

// Server connectivity test page
app.get('/', (req, res) => {
    res.send('ServingGo merchant server deployed!');
});

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});