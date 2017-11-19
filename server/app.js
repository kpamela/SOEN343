/**
 * Main node.js file which hosts the webserver
 * Runs with npm start
 */

const express = require('express'),
    CatalogueMapper = require('./domain/mappers/CatalogueMapper'),
    ClientDashboardMapper = require('./domain/mappers/ClientDashboardMapper'),
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
    compiler = webpack(config),
    CatalogueAspect = require('./domain/Aspects/CatalogueAspect.js'),
    AdminAspect = require('./domain/Aspects/AdminDashboardAspect.js'),
    ClientAspect = require('./domain/Aspects/ClientDashboardAspect.js'),
    UserAspect = require('./domain/Aspects/UserAspect.js'),
    QueueAspect = require('./data-source/TDG/QueueAspect');
const aspect = require('aspect-js');
const meld = require('meld');
const trace = require('meld/aspect/trace');


function t(i){
    precondition: i ===0;
    console.log(i);
}
t(9);


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
let catalogueMapper = new CatalogueMapper();
let clientDashboardMapper = new ClientDashboardMapper();


/**
 *
 *
 * Aspects
 *
 * For Authorization of token
 */
let catAspect = new CatalogueAspect(catalogueMapper);
let adminAspect = new AdminAspect(adminDashboardMapper);
let clientAspect = new ClientAspect(clientDashboardMapper);
let userAspect = new UserAspect(userMapper);

/**
 *
 *
 *
 * Routes
 */

//app.use('/users', userMapper.router);
//app.use('/products', adminDashboardMapper.router);

/**
 *
 * GET
 *
 */
app.get('/users/activeUsers', userMapper.getActiveUsersRegistry);

app.get('/products/view', catalogueMapper.view);
app.get('/products/revertChanges', adminDashboardMapper.revertChanges);
app.get('/products/getCommitState', adminDashboardMapper.getCommitState);
app.get('/products/getShoppingCart', clientDashboardMapper.getShoppingCart);
app.get('/products/getPurchaseHistory', clientDashboardMapper.getPurchaseHistory);
app.get('/users/getRegisteredUsers', adminDashboardMapper.getRegisteredUsers);
/**
 *
 * POST
 *
 */
app.post('/users/authenticate', userMapper.authenticate);
app.post('/users/register', userMapper.registerUser);
app.post('/users/logout', userMapper.logout);
app.post('/users/deleteAccount', userMapper.deleteAccount);

app.post('/products/add', adminDashboardMapper.add);
app.post('/products/remove', adminDashboardMapper.remove);
app.post('/products/commitChanges', adminDashboardMapper.commitChanges);
app.post('/products/addToCart', clientDashboardMapper.addToCart);
app.post('/products/removeFromCart', clientDashboardMapper.removeFromCart);
app.post('/products/completeTransaction', clientDashboardMapper.completeTransaction);
app.post('/products/returnItem', clientDashboardMapper.returnItem);
app.patch('/products/modify', adminDashboardMapper.modify);


app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


/**
 *
 *
 *
 *
 */

// Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});





module.exports = app;
