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
exports.getUserShipping = exports.updateUserShippingStatus = exports.getUserShippings = exports.addNewUserShipping = void 0;
var models_1 = require("../models");
var helpers_1 = require("../helpers");
var utils_1 = require("../utils");
var addNewUserShipping = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, products, validProducts, company, newUserShipping, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                if (!user) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Al parecer no tienes activa tu sesion"
                        })];
                }
                products = req.body.products;
                validProducts = products.some(function (el) { return el.id === ''; });
                if (validProducts) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Favor de mandar correctamente el id de los productos"
                        })];
                }
                if (!products) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Son necesarios los productos a pedir"
                        })];
                }
                return [4 /*yield*/, models_1.User.findById(req.body.company)];
            case 1:
                company = _a.sent();
                if (!company) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "La compania no esta registrada o ha sido dado de baja"
                        })];
                }
                if (company.rol !== 'CLIENT') {
                    return [2 /*return*/, res.status(401).json({
                            msg: "No es una compania valida"
                        })];
                }
                newUserShipping = new models_1.UserShipping({
                    products: req.body.products,
                    description: req.body.description,
                    user: req.body.user,
                    company: req.body.company
                });
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, newUserShipping.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(201).json({
                        msg: "Envio realizado con exito",
                        shipping: newUserShipping
                    })];
            case 4:
                e_1 = _a.sent();
                (0, helpers_1.errorResponse)(e_1, res);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addNewUserShipping = addNewUserShipping;
var updateUserShippingStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status, userShipping;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                status = req.body.status.toLowerCase();
                if (!utils_1.ENUM_STATUS.includes(status)) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "No es un status valido"
                        })];
                }
                return [4 /*yield*/, models_1.UserShipping.findByIdAndUpdate(id, {
                        status: status
                    }, { "new": true })];
            case 1:
                userShipping = _a.sent();
                if (!userShipping) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "No existe el envio consultado"
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        userShipping: userShipping
                    })];
        }
    });
}); };
exports.updateUserShippingStatus = updateUserShippingStatus;
var getUserShippings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userShippings;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!(((_b = req.user) === null || _b === void 0 ? void 0 : _b.rol) === 'FINAL_USER')) return [3 /*break*/, 2];
                return [4 /*yield*/, models_1.UserShipping.find({
                        "user": id
                    })];
            case 1:
                userShippings = _c.sent();
                console.log(userShippings);
                if (!userShippings.length) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "No cuentas con pedidos realizados"
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        userShippings: userShippings
                    })];
            case 2: return [2 /*return*/, res.status(400).json({
                    msg: 'El rol no es valido'
                })];
        }
    });
}); };
exports.getUserShippings = getUserShippings;
var getUserShipping = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, shipping, user, addressDestination, userInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, models_1.UserShipping.findById(id)];
            case 1:
                shipping = _a.sent();
                user = req.user;
                addressDestination = {
                    street: user === null || user === void 0 ? void 0 : user.street,
                    numInt: user === null || user === void 0 ? void 0 : user.numInt,
                    numExt: user === null || user === void 0 ? void 0 : user.numExt,
                    colony: user === null || user === void 0 ? void 0 : user.colony,
                    municipality: user === null || user === void 0 ? void 0 : user.municipality,
                    state: user === null || user === void 0 ? void 0 : user.state
                };
                userInfo = {
                    name: (user === null || user === void 0 ? void 0 : user.name) + ' ' + (user === null || user === void 0 ? void 0 : user.firstLastName),
                    phone: user === null || user === void 0 ? void 0 : user.phone
                };
                if (!shipping) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "No existe el pedido consultado"
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        shipping: shipping,
                        addressDestination: addressDestination,
                        userInfo: userInfo
                    })];
        }
    });
}); };
exports.getUserShipping = getUserShipping;
