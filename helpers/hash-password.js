"use strict";
exports.__esModule = true;
exports.hashPassword = void 0;
var bcrypt_1 = require("bcrypt");
var saltRounds = 10;
var hashPassword = function (password) {
    if (password === void 0) { password = ''; }
    var salt = bcrypt_1["default"].genSaltSync(saltRounds);
    return bcrypt_1["default"].hashSync(password, salt);
};
exports.hashPassword = hashPassword;
