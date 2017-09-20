/**
 * Main node.js file which hosts the webserver
 * Runs with npm start
 */

const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    mysql = require('mysql'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('../webpack.config.js'),
    compiler = webpack(config);

// Launch express
const app = express();

// Build with webpack
app.use(webpackHotMiddleware(compiler));
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        historyApiFallback: true
    }
}));

// Create the connection to the db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root'
});

// Connect to the db
db.connect((err) => {
    if(err) throw err;
    console.log('Mysql connected');
    // Create the database
    let sql = 'CREATE DATABASE IF NOT EXISTS tecmarket';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log('Database tecmarket created')
    });
});

// Port number
const port = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

// Set static folder
app.use('/' ,express.static(path.join(__dirname, 'public')));

// bodyParser middleware
app.use(bodyParser.json());

// Passport middleware
//app.use(passport.initialize());
//app.use(passport.session());
//require('./config/passport')(passport);

// API routes go here


// Index route
//app.get('/', (req, res) => {
//    res.send('Invalid endpoint');
//});

app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});