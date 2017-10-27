/**
 * Main node.js file which hosts the webserver
 * Runs with npm start
 */

const express = require('express'),
    AdminDashboardMapper = require('./domain/mappers/AdminDashboardMapper.js'),
    UserMapper = require('./domain/mappers/UserMapper.js'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('../webpack.config.js'),
    compiler = webpack(config);

// Configure the database
var configDB = require('./data-source/config/database.js');

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

// Port number
const port = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

// Set static folder
app.use('/' ,express.static(path.join(__dirname, '../public')));

// bodyParser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./data-source/config/passport')(passport);

// API mappers go here
//TODO check for admin or client
let userMapper = new UserMapper();
let adminDashboardMapper = new AdminDashboardMapper();
app.use('/users', userMapper.router);
app.use('/products', adminDashboardMapper.router);
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = app;
