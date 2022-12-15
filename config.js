"use strict";
exports.__esModule = true;
exports.db = exports.port = void 0;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var port = process.env.PORT || 4100;
exports.port = port;
var db = '';
exports.db = db;
if (process.env.NODE_ENV === 'development') {
    console.log('db qa');
    console.log(process.env.NODE_ENV);
    exports.db = db = 'mongodb+srv://root:cKpK6NXC5rr6iy52@pakevadb.qgb7mnu.mongodb.net/test';
}
if (process.env.NODE_ENV === 'production') {
    console.log('db prod');
    console.log(process.env.NODE_ENV);
    exports.db = db = 'mongodb+srv://root:cKpK6NXC5rr6iy52@pakevaprod.oseolpp.mongodb.net/?retryWrites=true&w=majority';
}
