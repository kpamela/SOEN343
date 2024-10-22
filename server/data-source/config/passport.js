/**
 * Configures passport for user authentification
 */

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    db = require('./database.js')

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'mysecret';
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        db.getConnection((err, connection) => {
            let sql = `SELECT * FROM users WHERE id = ${jwt_payload._doc._id}`
            connection.query(sql, (err, user) => {
                if(err){
                    return done(err, false);
                }
                if(user){
                    return done(null, user);
                }
                else{
                    return(null, false);
                }
            });
        });

    }));
}






/**
 * module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload._doc._id, (err, user) => {
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        });
    }));
}
 */