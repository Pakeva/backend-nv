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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserActive = exports.userExists = exports.emailExists = exports.isValidRol = void 0;
const models_1 = require("../models");
const config_1 = require("../database/config");
const mongoose_1 = require("mongoose");
const isValidRol = (rol) => __awaiter(void 0, void 0, void 0, function* () {
    let existsRol;
    try {
        yield (0, config_1.connectDb)();
        existsRol = yield models_1.Rol.findOne({ rol });
        yield (0, config_1.disconnectDb)();
    }
    catch (e) {
        console.log(e);
        throw new Error('Hable con el encargado para ver el problema');
    }
    if (!existsRol) {
        throw new Error('El rol no esta definido en la base de datos');
    }
});
exports.isValidRol = isValidRol;
const emailExists = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    let emailIsRegistered;
    try {
        yield (0, config_1.connectDb)();
        emailIsRegistered = yield models_1.User.findOne({ email });
        yield (0, mongoose_1.disconnect)();
    }
    catch (e) {
        console.log(e);
        throw new Error('Hable con el encargado para ver el problema');
    }
    if (emailIsRegistered) {
        throw new Error('El email ya está registrado');
    }
});
exports.emailExists = emailExists;
const userExists = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    let userIsRegistered;
    try {
        yield (0, config_1.connectDb)();
        userIsRegistered = yield models_1.User.findById(id);
        yield (0, config_1.disconnectDb)();
    }
    catch (e) {
        console.log(e);
        throw new Error('Hable con el encargado para ver el problema');
    }
    if (!userIsRegistered) {
        throw new Error('EL usuario no está registrado');
    }
});
exports.userExists = userExists;
const isUserActive = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    try {
        yield (0, config_1.connectDb)();
        user = yield models_1.User.findById(id, { status: 1 });
        console.log(user);
        yield (0, config_1.disconnectDb)();
    }
    catch (e) {
        console.log(e);
        throw new Error('Hable con el encargado para ver el problema');
    }
    if (!user.status) {
        throw new Error('EL usuario no está activo o ha ya sido eliminado');
    }
});
exports.isUserActive = isUserActive;
