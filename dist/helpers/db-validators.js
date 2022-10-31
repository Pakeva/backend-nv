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
exports.productExists = exports.categoryExists = exports.searchUserByEmail = exports.isUserActive = exports.userExists = exports.emailExists = exports.isValidRol = void 0;
const models_1 = require("../models");
const isValidRol = (rol) => __awaiter(void 0, void 0, void 0, function* () {
    let existsRol;
    try {
        existsRol = yield models_1.Rol.findOne({ rol });
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
        emailIsRegistered = yield models_1.User.findOne({ email });
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
        userIsRegistered = yield models_1.User.findById(id);
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
        user = yield models_1.User.findById(id, { status: 1 });
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
const searchUserByEmail = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    let existsEmail;
    try {
        existsEmail = yield models_1.User.findOne({ email });
    }
    catch (e) {
        throw new Error(e);
    }
    if (!existsEmail) {
        throw new Error('El email no esta registrado en la base de datos');
    }
});
exports.searchUserByEmail = searchUserByEmail;
const categoryExists = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    let category;
    try {
        category = yield models_1.Category.findOne({ id });
    }
    catch (e) {
        throw new Error(e);
    }
    if (!category) {
        throw new Error('La categoría no esta registrada en la base de datos');
    }
});
exports.categoryExists = categoryExists;
const productExists = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    let product;
    try {
        product = yield models_1.Product.findOne({ id });
    }
    catch (e) {
        throw new Error(e);
    }
    if (!product) {
        throw new Error('El producto no esta registrado en la base de datos');
    }
});
exports.productExists = productExists;
