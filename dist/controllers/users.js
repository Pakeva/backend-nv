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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByBondingCode = exports.deleteUser = exports.getUser = exports.getUsers = exports.updateUser = exports.createUser = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const randomstring_1 = __importDefault(require("randomstring"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const user = new models_1.User(Object.assign({}, body));
    user.password = (0, helpers_1.hashPassword)(user.password);
    user.bondingCode = randomstring_1.default.generate(5);
    try {
        yield user.save();
        res.status(201).json({
            msg: 'Usuario creado correctamente',
            user
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { email, rol } = _a, user = __rest(_a, ["email", "rol"]);
    if (user.password) {
        user.password = (0, helpers_1.hashPassword)(user.password);
    }
    try {
        const userUpdated = yield models_1.User.findByIdAndUpdate(id, user, { new: true });
        res.status(200).json({
            msg: 'Usuario actualizado correctamente',
            user: Object.assign(Object.assign({}, user), { password: '' })
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.updateUser = updateUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //HANDLE QUERYS - Page & Limit depend business rules;
    try {
        const users = yield models_1.User.find();
        res.status(200).json({
            msg: 'success',
            users
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield models_1.User.findById(id);
        if (!user) {
            return res.status(404).json({
                msg: 'El usuario no está registrado'
            });
        }
        res.status(200).json({
            user
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield models_1.User.findByIdAndUpdate(id, { status: false });
        res.status(200).json({
            msg: 'El usuario ha sido eliminado'
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.deleteUser = deleteUser;
const getUserByBondingCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bc } = req.params;
    let userByBondingCode;
    try {
        userByBondingCode = yield models_1.User.findOne({ bondingCode: bc });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
    res.status(200).json({
        msg: 'Success',
        user: userByBondingCode
    });
});
exports.getUserByBondingCode = getUserByBondingCode;
