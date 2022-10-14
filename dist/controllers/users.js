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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUser = exports.getUsers = exports.updateUser = exports.createUser = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const config_1 = require("../database/config");
const mongoose_1 = require("mongoose");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const user = new models_1.User(Object.assign({}, body));
    user.password = (0, helpers_1.hashPassword)(user.password);
    try {
        yield (0, config_1.connectDb)();
        yield user.save();
        yield (0, mongoose_1.disconnect)();
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
        yield (0, config_1.connectDb)();
        const userUpdated = yield models_1.User.findByIdAndUpdate(id, user, { new: true });
        yield (0, config_1.disconnectDb)();
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
        yield (0, config_1.connectDb)();
        const users = yield models_1.User.find();
        yield (0, config_1.disconnectDb)();
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
        yield (0, config_1.connectDb)();
        const user = yield models_1.User.findById(id);
        yield (0, config_1.disconnectDb)();
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
        yield (0, config_1.connectDb)();
        yield models_1.User.findByIdAndUpdate(id, { status: false });
        yield (0, config_1.disconnectDb)();
        res.status(200).json({
            msg: 'El usuario ha sido eliminado'
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.deleteUser = deleteUser;
