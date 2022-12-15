"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 4100;
exports.port = port;
let db = '';
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
