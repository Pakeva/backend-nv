"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewShipping = exports.getShipping = void 0;
const ManualShipping_1 = __importDefault(require("../models/ManualShipping"));
const getShipping = (req, res) => {
    console.log(req.user);
    return res.status(200).json({
        msg: 'hello world'
    });
};
exports.getShipping = getShipping;
const addNewShipping = (req, res) => {
    console.log(req.body);
    const newShipping = new ManualShipping_1.default();
    return res.status(200).json({
        msg: 'hello world post'
    });
};
exports.addNewShipping = addNewShipping;
