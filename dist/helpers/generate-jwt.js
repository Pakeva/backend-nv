"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//uid: user identifier
const generateJwt = (uid = '') => {
    return new Promise((res, rej) => {
        //You can save all that you want
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, process.env.SECRETKEY, {
            expiresIn: '24h'
        }, (err, token) => {
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
