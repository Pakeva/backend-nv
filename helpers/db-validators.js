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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.bondingCodeExists = exports.productExists = exports.categoryExists = exports.searchUserByEmail = exports.isUserActive = exports.userExists = exports.emailExists = exports.isValidRol = void 0;
var models_1 = require("../models");
var isValidRol = function (rol) { return __awaiter(void 0, void 0, void 0, function () {
    var existsRol, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.Rol.findOne({ rol: rol })];
            case 1:
                existsRol = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                throw new Error('Hable con el encargado para ver el problema');
            case 3:
                if (!existsRol) {
                    throw new Error('El rol no esta definido en la base de datos');
                }
                return [2 /*return*/];
        }
    });
}); };
exports.isValidRol = isValidRol;
var emailExists = function (email) {
    if (email === void 0) { email = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var emailIsRegistered, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, models_1.User.findOne({ email: email })];
                case 1:
                    emailIsRegistered = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    console.log(e_2);
                    throw new Error('Hable con el encargado para ver el problema');
                case 3:
                    if (emailIsRegistered) {
                        throw new Error('El email ya está registrado');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.emailExists = emailExists;
var userExists = function (id) {
    if (id === void 0) { id = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var userIsRegistered, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('entre aquii');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, models_1.User.findById(id)];
                case 2:
                    userIsRegistered = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.log(e_3);
                    throw new Error('Hable con el encargado para ver el problema');
                case 4:
                    if (!userIsRegistered) {
                        throw new Error('EL usuario no está registrado');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.userExists = userExists;
var isUserActive = function (id) {
    if (id === void 0) { id = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var user, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, models_1.User.findById(id, { status: 1 })];
                case 1:
                    user = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    console.log(e_4);
                    throw new Error('Hable con el encargado para ver el problema');
                case 3:
                    if (!user.status) {
                        throw new Error('EL usuario no está activo o ha ya sido eliminado');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.isUserActive = isUserActive;
var searchUserByEmail = function (email) {
    if (email === void 0) { email = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var existsEmail, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, models_1.User.findOne({ email: email })];
                case 1:
                    existsEmail = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _a.sent();
                    throw new Error(e_5);
                case 3:
                    if (!existsEmail) {
                        throw new Error('El email no esta registrado en la base de datos');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.searchUserByEmail = searchUserByEmail;
var categoryExists = function (id) {
    if (id === void 0) { id = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var category, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, models_1.Category.findOne({ id: id })];
                case 1:
                    category = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _a.sent();
                    throw new Error(e_6);
                case 3:
                    if (!category) {
                        throw new Error('La categoría no esta registrada en la base de datos');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.categoryExists = categoryExists;
var productExists = function (id) {
    if (id === void 0) { id = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var product, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, models_1.Product.findOne({ id: id })];
                case 1:
                    product = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_7 = _a.sent();
                    throw new Error(e_7);
                case 3:
                    if (!product) {
                        throw new Error('El producto no esta registrado en la base de datos');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.productExists = productExists;
var bondingCodeExists = function (bondingCode) {
    if (bondingCode === void 0) { bondingCode = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var userIsRegistered, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, models_1.User.findOne({ bondingCode: bondingCode })];
                case 1:
                    userIsRegistered = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_8 = _a.sent();
                    console.log(e_8);
                    throw new Error('Hable con el encargado para ver el problema');
                case 3:
                    if (!userIsRegistered) {
                        throw new Error('El codigo es incorrecto');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.bondingCodeExists = bondingCodeExists;
