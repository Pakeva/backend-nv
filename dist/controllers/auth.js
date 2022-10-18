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
exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
const config_1 = require("../database/config");
const helpers_1 = require("../helpers");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    yield (0, config_1.connectDb)();
    let user = (yield models_1.User.findOne({ email })) || {};
    yield (0, config_1.disconnectDb)();
    if (!user.status) {
        return res.status(400).json({
            msg: 'Este usuario ha sido deshabilitado o eliminado'
        });
    }
    if (!password) {
        return res.status(400).json({
            msg: 'Es necesaria la contraseña'
        });
    }
    const comparePass = bcrypt_1.default.compareSync(password, user.password);
    if (!comparePass) {
        return res.status(400).json({
            msg: 'Las contraseñas no coinciden'
        });
    }
    const token = yield (0, helpers_1.generateJwt)(user._id.toString());
    return res.status(200).json({
        msg: 'Success login user',
        token
    });
});
exports.loginUser = loginUser;
