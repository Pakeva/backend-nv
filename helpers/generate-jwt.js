"use strict";
exports.__esModule = true;
exports.generateJwt = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var secretKey = 'Thisishtesecretkey,mustbeencrypted';
//uid: user identifier
var generateJwt = function (uid) {
    if (uid === void 0) { uid = ''; }
    return new Promise(function (res, rej) {
        //You can save all that you want
        var payload = { uid: uid };
        jsonwebtoken_1["default"].sign(payload, process.env.SECRETKEY || secretKey, {
            expiresIn: '7d'
        }, function (err, token) {
            if (err) {
                console.log(err);
                rej('Is not possible generate the JWT');
            }
            else {
                res(token);
            }
        });
    });
};
exports.generateJwt = generateJwt;
