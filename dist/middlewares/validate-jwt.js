"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJwt = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../database/config");
const secretKey = 'Thisishtesecretkey,mustbeencrypted';
const validateJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            msg: 'No token in the petition'
        });
    }
    try {
        // @ts-ignore
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRETKEY || secretKey);
        req.header = uid;
        //Get the user own of the uid
        yield (0, config_1.connectDb)();
        const user = yield models_1.User.findById(uid);
        yield (0, config_1.disconnectDb)();
        //Verify if the user exists
        if (!user) {
            return res.status(401).json({
                msg: 'Token not valid - user not in DB'
            });
        }
        //Verify is the uid is state true
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token not valid - user with status false'
            });
        }
        // @ts-ignore
        req.user = user;
        next();
    }
    catch (e) {
        console.log(e);
        res.status(401).json({
            msg: 'Token not valid'
        });
    }
});
exports.validateJwt = validateJwt;
