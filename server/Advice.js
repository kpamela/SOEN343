/**
 * Created by CharlesPhilippe on 2017-11-03.
 */
const meld = require('meld'),
    jwt = require('jsonwebtoken');


/**
 *
 *
 * Advices
 */
function aroundAuthorization() {
    Console.log("Advice Triggered");
    let joinpoint = meld.joinpoint();
    let req = joinpoint.args[0];
    let res = joinpoint.args[1];

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({success: false, msg: "Unauthorized: No Token Provided"});
    }

    return jwt.verify(token, 'mysecret', function (err, decoded) {
        if (err) {
            return res.status(401).json({success: false, msg: "Unauthorized: Incorrect Token Signature"});
        }
        else {
            joinpoint.proceed();
        }
    });
}

module.exports = aroundAuthorization;


