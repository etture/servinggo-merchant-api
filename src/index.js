const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const app = express();
const dotenv = require('dotenv').config();
const http = require('http');
const https = require('https');
const fs = require('fs');

const options = {
    ca: fs.readFileSync(__dirname + '../ssl/servinggo_app.ca-bundle'),
    key: fs.readFileSync(__dirname + '../ssl/servinggo_app.p7b'),
    cert: fs.readFileSync(__dirname + '../ss/servinggo_app.crt')
};

// Port
const HTTP_PORT = process.env.HTTP_PORT || 3080;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;

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
    res.send(
        '<h1>ServingGo merchant server deployed!</h1>'
    );
});

app.get('/test', (req, res) => {
    res.send('testing page');
});

// app.listen(PORT, () => {
//     console.log(`server started on ${PORT}`);
// });

http.createServer(app).listen(HTTP_PORT, () => {
    console.log(`http server started on ${HTTP_PORT}`);
});

https.createServer(options, app).listen(HTTPS_PORT, () => {
    console.log(`https server started on ${HTTPS_PORT}`);
});